<?php
class DB {
    public static function connect() {
        global $db;
        $db = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME)
              or die("Error: " . mysqli_error());
        return $db == true;
    }

    public static function query($sql) {
        global $db;
        return mysqli_query($db, $sql);
    }

    public static function id()
    {
        global $db;
        return $db->insert_id;
    }

    public static function esc($value) {
        global $db;
        return mysqli_real_escape_string($db, $value);
    }
}