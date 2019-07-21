<?php

function exception_msg(\Throwable $th)
{
    return $th->getFile() . ':' . $th->getLine() .  ' => ' .  $th->getMessage() . "\n";
}