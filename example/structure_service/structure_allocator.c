#include ".bin/structure_type.h"

data_t* structureCreate() {
	data_t* data = (data_t*) malloc(sizeof(data_t));
	data->steering_wheel.marker = 0;
	data->inverters.right.speed = (inverters_right_speed_data*) malloc(sizeof(inverters_right_speed_data) * 500);
	data->inverters.right.speed_count = 0;
	data->inverters.right.temperature_igbt = (inverters_right_temperature_igbt_data*) malloc(sizeof(inverters_right_temperature_igbt_data) * 500);
	data->inverters.right.temperature_igbt_count = 0;
	data->inverters.right.temperature_motors = (inverters_right_temperature_motors_data*) malloc(sizeof(inverters_right_temperature_motors_data) * 500);
	data->inverters.right.temperature_motors_count = 0;
	data->inverters.left.speed = (inverters_left_speed_data*) malloc(sizeof(inverters_left_speed_data) * 500);
	data->inverters.left.speed_count = 0;
	data->inverters.left.temperature_igbt = (inverters_left_temperature_igbt_data*) malloc(sizeof(inverters_left_temperature_igbt_data) * 500);
	data->inverters.left.temperature_igbt_count = 0;
	data->inverters.left.temperature_motors = (inverters_left_temperature_motors_data*) malloc(sizeof(inverters_left_temperature_motors_data) * 500);
	data->inverters.left.temperature_motors_count = 0;
	data->bms_hv.temperature = (bms_hv_temperature_data*) malloc(sizeof(bms_hv_temperature_data) * 500);
	data->bms_hv.temperature_count = 0;
	data->bms_hv.voltage = (bms_hv_voltage_data*) malloc(sizeof(bms_hv_voltage_data) * 500);
	data->bms_hv.voltage_count = 0;
	data->bms_hv.current = (bms_hv_current_data*) malloc(sizeof(bms_hv_current_data) * 500);
	data->bms_hv.current_count = 0;
	data->bms_hv.errors = (bms_hv_errors_data*) malloc(sizeof(bms_hv_errors_data) * 500);
	data->bms_hv.errors_count = 0;
	data->bms_hv.warnings = (bms_hv_warnings_data*) malloc(sizeof(bms_hv_warnings_data) * 500);
	data->bms_hv.warnings_count = 0;
	data->bms_lv.values = (bms_lv_values_data*) malloc(sizeof(bms_lv_values_data) * 500);
	data->bms_lv.values_count = 0;
	data->bms_lv.errors = (bms_lv_errors_data*) malloc(sizeof(bms_lv_errors_data) * 500);
	data->bms_lv.errors_count = 0;
	data->gps.new = (gps_new_data*) malloc(sizeof(gps_new_data) * 500);
	data->gps.new_count = 0;
	data->gps.old.location = (gps_old_location_data*) malloc(sizeof(gps_old_location_data) * 500);
	data->gps.old.location_count = 0;
	data->gps.old.time = (gps_old_time_data*) malloc(sizeof(gps_old_time_data) * 500);
	data->gps.old.time_count = 0;
	data->gps.old.true_track_mode = (gps_old_true_track_mode_data*) malloc(sizeof(gps_old_true_track_mode_data) * 500);
	data->gps.old.true_track_mode_count = 0;
	data->imu_gyro = (imu_gyro_data*) malloc(sizeof(imu_gyro_data) * 500);
	data->imu_gyro_count = 0;
	data->imu_accel = (imu_accel_data*) malloc(sizeof(imu_accel_data) * 500);
	data->imu_accel_count = 0;
	data->front_wheels_encoder = (front_wheels_encoder_data*) malloc(sizeof(front_wheels_encoder_data) * 500);
	data->front_wheels_encoder_count = 0;
	data->distance = (distance_data*) malloc(sizeof(distance_data) * 500);
	data->distance_count = 0;
	data->throttle = (throttle_data*) malloc(sizeof(throttle_data) * 500);
	data->throttle_count = 0;
	data->brake = (brake_data*) malloc(sizeof(brake_data) * 500);
	data->brake_count = 0;
	data->steering_wheel.encoder = (steering_wheel_encoder_data*) malloc(sizeof(steering_wheel_encoder_data) * 500);
	data->steering_wheel.encoder_count = 0;
	data->steering_wheel.gears = (steering_wheel_gears_data*) malloc(sizeof(steering_wheel_gears_data) * 500);
	data->steering_wheel.gears_count = 0;
	
	return data;
}