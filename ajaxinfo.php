<?php
// cpu load
$cpuload = exec("ps aux | awk '{s += $3} END {print s}'")/1;

$cpu = array(
	'cpu' => $cpuload
);

// mem usage
$get_meminfo = file('/proc/meminfo');

$mem_total  = filter_var($get_meminfo[0], FILTER_SANITIZE_NUMBER_INT);
$mem_cached = filter_var($get_meminfo[2], FILTER_SANITIZE_NUMBER_INT)/1;
$mem_free   = filter_var($get_meminfo[1], FILTER_SANITIZE_NUMBER_INT);
$mem_usage  = ($mem_total - ($mem_free + $mem_cached));

$mem = array(
    'total'  => $mem_total,
	'usage'  => $mem_usage,
	'cached' => $mem_cached
);

// disk usage
$disk_space_total = disk_total_space('/');
$disk_space_free  = disk_free_space('/');
$disk_space_usage = ($disk_space_total - $disk_space_free);

$disk = array(
    'total' => $disk_space_total,
	'usage' => $disk_space_usage
);

$info = array(
	$cpu,
	$mem,
	$disk
);

echo json_encode($info);
