<?php
class Workout {
    private $id;
    private $routine_id;
	private $date;
    private $created_at;

	private $fillable = array(
        'routine_id',
        'date'
	);

	/************************************************/
    /** CONSTANS ************************************/
    /************************************************/

	const TABLE = 'workout';
	const TABLE_ID = 'id';

	/************************************************/
    /** CLASS METHODS *******************************/
    /************************************************/

	public function __construct($options = '') {
        if (is_array($options) || is_object($options)) {
            foreach ($options as $key => $value) {
                $this->$key = $value;
            }
        }
    }

    public static function where($where = '', $orderBy = '', $debug = false) {
        if ($where != '') {
            $whereString = "WHERE $where";
        }

        if ($orderBy == '') {
            $orderBy = self::TABLE_ID . ' DESC';
        }

        $sql = "SELECT *
            FROM " . self::TABLE . "
            $whereString
            ORDER BY $orderBy";

        if ($debug) {
            echo 'debug ' . __METHOD__ . ' sql: ' . $sql . '<br>';
        }

        $qry = DB::query($sql);
        $objects = array();

        if (mysqli_num_rows($qry) > 0) {
            while($object = mysqli_fetch_object($qry)) {
                $classObject    = new Workout($object);
                $objects[] = $classObject;
            }
        }
        return $objects;
    }

    public static function all($orderBy = 'created_at', $order = 'ASC') {
        return self::where('', $orderBy . ' ' . $order, false);
    }

    public static function byId($id, $where = '') {
        $where = self::TABLE_ID . ' = ' . intval($id)
            . (!empty($where) ? " AND $where " : '');

        $objects = self::where($where);
        if (!empty($objects)) {
            return $objects[0];
        }

        return false;
    }

    /************************************************/
    /** OBJECT METHODS ******************************/
    /************************************************/

    public function save() {
    	if ($this->id() == 0) {
            $sql = "INSERT INTO " . self::TABLE . " () VALUES ()";
            DB::query($sql);
            $this->__set(self::TABLE_ID, DB::id());
        }

        /*
        if ($this->id() == 0) {
            $sql = "INSERT INTO " . self::TABLE . " () VALUES ()";
            mysql_query($sql);
            $this->__set(self::TABLE_ID, mysql_insert_id());
        }
        */

        $out = "\n";
        foreach ($this->fillable as $col) {
                $value = DB::esc($this->__get($col));
                $out .= "\t\t$col \t= '$value',\n";
        }

        $out = rtrim($out, ",\n");
        $out .= "\n\t\t";

        $sql = "UPDATE " . self::TABLE . " SET
                $out
            WHERE " . self::TABLE_ID . " = " . $this->id();

        return DB::query($sql);
    }

    public function delete() {
    	return true;
    }

	public function id() {
        // echo 'id out: ' . self::TABLE_ID . '<br>';
        return $this->{self::TABLE_ID};
    }

    public function routine() {
        return Routine::byId($this->routine_id);
    }

	public function __get($property) {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }

    public function __set($property, $value) {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
        return $this;
    }
}
?>