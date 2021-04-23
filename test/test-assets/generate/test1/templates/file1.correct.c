typedef struct {
	char* a;
	int b;
	double d;
	char** arr;
	int arr_count;
	int* arrr;
	int arrr_count;
	double* arrrr;
	int arrrr_count;
} obj1_config_t;

typedef struct {
	char* a;
	int b;
	double d;
	char** arr;
	int arr_count;
	int* arrr;
	int arrr_count;
	double* arrrr;
	int arrrr_count;
} obj2_config_t;

typedef struct {
	char* a;
	int b;
	double d;
	char** arr;
	int arr_count;
	int* arrr;
	int arrr_count;
	double* arrrr;
	int arrrr_count;
	obj1_config_t obj1;
	obj2_config_t obj2;
} config_t;


// -------------------

config->a = strdup("ciao");
config->b = 23;
config->d = 23.23;
config->arr_count = 2;
config->arr = (char**) malloc(sizeof(char*) * config->arr_count);
config->arr[0] = strdup("asdf");
config->arr[1] = strdup("asdf");
config->arrr_count = 2;
config->arrr = (int*) malloc(sizeof(int) * config->arrr_count);
config->arrr[0] = 2;
config->arrr[1] = 3;
config->arrrr_count = 1;
config->arrrr = (double*) malloc(sizeof(double) * config->arrrr_count);
config->arrrr[0] = 2.3;
config->obj1.a = strdup("ciao");
config->obj1.b = 23;
config->obj1.d = 23.23;
config->obj1.arr_count = 2;
config->obj1.arr = (char**) malloc(sizeof(char*) * config->obj1.arr_count);
config->obj1.arr[0] = strdup("asdf");
config->obj1.arr[1] = strdup("asdf");
config->obj1.arrr_count = 2;
config->obj1.arrr = (int*) malloc(sizeof(int) * config->obj1.arrr_count);
config->obj1.arrr[0] = 2;
config->obj1.arrr[1] = 3;
config->obj1.arrrr_count = 1;
config->obj1.arrrr = (double*) malloc(sizeof(double) * config->obj1.arrrr_count);
config->obj1.arrrr[0] = 2.3;
config->obj2.a = strdup("ciao");
config->obj2.b = 23;
config->obj2.d = 23.23;
config->obj2.arr_count = 2;
config->obj2.arr = (char**) malloc(sizeof(char*) * config->obj2.arr_count);
config->obj2.arr[0] = strdup("asdf");
config->obj2.arr[1] = strdup("asdf");
config->obj2.arrr_count = 2;
config->obj2.arrr = (int*) malloc(sizeof(int) * config->obj2.arrr_count);
config->obj2.arrr[0] = 2;
config->obj2.arrr[1] = 3;
config->obj2.arrrr_count = 1;
config->obj2.arrrr = (double*) malloc(sizeof(double) * config->obj2.arrrr_count);
config->obj2.arrrr[0] = 2.3;


// -------------------

printf("config->a:\t%s\n", config->a);
printf("config->b:\t%d\n", config->b);
printf("config->d:\t%f\n", config->d);
printf("config->arr: ");
printStringsArray(config->arr, config->arr_count);
printf("config->arrr: ");
printIntArray(config->arrr, config->arrr_count);
printf("config->arrrr: ");
printDoubleArray(config->arrrr, config->arrrr_count);
printf("config->obj1.a:\t%s\n", config->obj1.a);
printf("config->obj1.b:\t%d\n", config->obj1.b);
printf("config->obj1.d:\t%f\n", config->obj1.d);
printf("config->obj1.arr: ");
printStringsArray(config->obj1.arr, config->obj1.arr_count);
printf("config->obj1.arrr: ");
printIntArray(config->obj1.arrr, config->obj1.arrr_count);
printf("config->obj1.arrrr: ");
printDoubleArray(config->obj1.arrrr, config->obj1.arrrr_count);
printf("config->obj2.a:\t%s\n", config->obj2.a);
printf("config->obj2.b:\t%d\n", config->obj2.b);
printf("config->obj2.d:\t%f\n", config->obj2.d);
printf("config->obj2.arr: ");
printStringsArray(config->obj2.arr, config->obj2.arr_count);
printf("config->obj2.arrr: ");
printIntArray(config->obj2.arrr, config->obj2.arrr_count);
printf("config->obj2.arrrr: ");
printDoubleArray(config->obj2.arrrr, config->obj2.arrrr_count);


// -------------------

data->bms_hv.temperature_size = 500;
data->bms_hv.temperature = (bms_hv_temperature_data*) malloc(sizeof(bms_hv_temperature_data) * data->bms_hv.temperature_size);
data->bms_hv.temperature_count = 0;
data->bms_hv.voltage_size = 500;
data->bms_hv.voltage = (bms_hv_voltage_data*) malloc(sizeof(bms_hv_voltage_data) * data->bms_hv.voltage_size);
data->bms_hv.voltage_count = 0;
data->bms_hv.current_size = 500;
data->bms_hv.current = (bms_hv_current_data*) malloc(sizeof(bms_hv_current_data) * data->bms_hv.current_size);
data->bms_hv.current_count = 0;
data->bms_hv.errors_size = 500;
data->bms_hv.errors = (bms_hv_errors_data*) malloc(sizeof(bms_hv_errors_data) * data->bms_hv.errors_size);
data->bms_hv.errors_count = 0;
data->imu.acceleration_size = 500;
data->imu.acceleration = (imu_acceleration_data*) malloc(sizeof(imu_acceleration_data) * data->imu.acceleration_size);
data->imu.acceleration_count = 0;
data->gps.gga_size = 500;
data->gps.gga = (gps_gga_data*) malloc(sizeof(gps_gga_data) * data->gps.gga_size);
data->gps.gga_count = 0;
data->gps.gll_size = 500;
data->gps.gll = (gps_gll_data*) malloc(sizeof(gps_gll_data) * data->gps.gll_size);
data->gps.gll_count = 0;
data->gps.vtg_size = 500;
data->gps.vtg = (gps_vtg_data*) malloc(sizeof(gps_vtg_data) * data->gps.vtg_size);
data->gps.vtg_count = 0;
data->gps.rmc_size = 500;
data->gps.rmc = (gps_rmc_data*) malloc(sizeof(gps_rmc_data) * data->gps.rmc_size);
data->gps.rmc_count = 0;


// -------------------

*bson_document = bson_new();
bson_t *children = (bson_t*)malloc(sizeof(bson_t) * 4);
BSON_APPEND_INT32(*bson_document, "id", data->id);
BSON_APPEND_INT64(*bson_document, "timestamp", data->timestamp);
BSON_APPEND_UTF8(*bson_document, "sessionName", data->sessionName);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "bms_hv", &children[0]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "temperature", &children[1]);
for (int i = 0; i < (data->bms_hv.temperature_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.temperature[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "average_temp", data->bms_hv.temperature[i].value.average_temp);
	BSON_APPEND_INT32(&children[3], "max_temp", data->bms_hv.temperature[i].value.max_temp);
	BSON_APPEND_INT32(&children[3], "min_temp", data->bms_hv.temperature[i].value.min_temp);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "voltage", &children[1]);
for (int i = 0; i < (data->bms_hv.voltage_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.voltage[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "pack_voltage", data->bms_hv.voltage[i].value.pack_voltage);
	BSON_APPEND_INT32(&children[3], "bus_voltage", data->bms_hv.voltage[i].value.bus_voltage);
	BSON_APPEND_INT32(&children[3], "min_cell_voltage", data->bms_hv.voltage[i].value.min_cell_voltage);
	BSON_APPEND_INT32(&children[3], "max_cell_voltage", data->bms_hv.voltage[i].value.max_cell_voltage);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "current", &children[1]);
for (int i = 0; i < (data->bms_hv.current_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.current[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "current", data->bms_hv.current[i].value.current);
	BSON_APPEND_INT32(&children[3], "power", data->bms_hv.current[i].value.power);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "errors", &children[1]);
for (int i = 0; i < (data->bms_hv.errors_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.errors[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "error_code", data->bms_hv.errors[i].value.error_code);
	BSON_APPEND_INT32(&children[3], "error_index", data->bms_hv.errors[i].value.error_index);
	BSON_APPEND_INT32(&children[3], "active", data->bms_hv.errors[i].value.active);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "imu", &children[0]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "acceleration", &children[1]);
for (int i = 0; i < (data->imu.acceleration_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->imu.acceleration[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "accel_x", data->imu.acceleration[i].value.accel_x);
	BSON_APPEND_INT32(&children[3], "accel_y", data->imu.acceleration[i].value.accel_y);
	BSON_APPEND_INT32(&children[3], "accel_z", data->imu.acceleration[i].value.accel_z);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "gps", &children[0]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "gga", &children[1]);
for (int i = 0; i < (data->gps.gga_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->gps.gga[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "latitude_safe", data->gps.gga[i].value.latitude_safe);
	BSON_APPEND_DOUBLE(&children[3], "longitude_safe", data->gps.gga[i].value.longitude_safe);
	BSON_APPEND_DOUBLE(&children[3], "latitude", data->gps.gga[i].value.latitude);
	BSON_APPEND_DOUBLE(&children[3], "longitude", data->gps.gga[i].value.longitude);
	BSON_APPEND_DOUBLE(&children[3], "altitude", data->gps.gga[i].value.altitude);
	BSON_APPEND_UTF8(&children[3], "ns_indicator", data->gps.gga[i].value.ns_indicator);
	BSON_APPEND_UTF8(&children[3], "ew_indicator", data->gps.gga[i].value.ew_indicator);
	BSON_APPEND_UTF8(&children[3], "utc_time", data->gps.gga[i].value.utc_time);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "gll", &children[1]);
for (int i = 0; i < (data->gps.gll_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->gps.gll[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "latitude", data->gps.gll[i].value.latitude);
	BSON_APPEND_DOUBLE(&children[3], "longitude", data->gps.gll[i].value.longitude);
	BSON_APPEND_UTF8(&children[3], "ns_indicator", data->gps.gll[i].value.ns_indicator);
	BSON_APPEND_UTF8(&children[3], "ew_indicator", data->gps.gll[i].value.ew_indicator);
	BSON_APPEND_UTF8(&children[3], "utc_time", data->gps.gll[i].value.utc_time);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "vtg", &children[1]);
for (int i = 0; i < (data->gps.vtg_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->gps.vtg[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "ground_speed_knots", data->gps.vtg[i].value.ground_speed_knots);
	BSON_APPEND_DOUBLE(&children[3], "ground_speed_human", data->gps.vtg[i].value.ground_speed_human);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "rmc", &children[1]);
for (int i = 0; i < (data->gps.rmc_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->gps.rmc[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "latitude", data->gps.rmc[i].value.latitude);
	BSON_APPEND_DOUBLE(&children[3], "longitude", data->gps.rmc[i].value.longitude);
	BSON_APPEND_UTF8(&children[3], "ns_indicator", data->gps.rmc[i].value.ns_indicator);
	BSON_APPEND_UTF8(&children[3], "ew_indicator", data->gps.rmc[i].value.ew_indicator);
	BSON_APPEND_UTF8(&children[3], "utc_time", data->gps.rmc[i].value.utc_time);
	BSON_APPEND_UTF8(&children[3], "date", data->gps.rmc[i].value.date);
	BSON_APPEND_DOUBLE(&children[3], "ground_speed_knots", data->gps.rmc[i].value.ground_speed_knots);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);


// -------------------

free(data->bms_hv.temperature);
free(data->bms_hv.voltage);
free(data->bms_hv.current);
free(data->bms_hv.errors);
free(data->imu.acceleration);
free(data->gps.gga);
free(data->gps.gll);
free(data->gps.vtg);
free(data->gps.rmc);
free(data);


// -------------------

typedef struct {
	int average_temp;
	int max_temp;
	int min_temp;
} bms_hv_temperature_value_data;

typedef struct {
	long timestamp;
	bms_hv_temperature_value_data value;
} bms_hv_temperature_data;

typedef struct {
	int pack_voltage;
	int bus_voltage;
	int min_cell_voltage;
	int max_cell_voltage;
} bms_hv_voltage_value_data;

typedef struct {
	long timestamp;
	bms_hv_voltage_value_data value;
} bms_hv_voltage_data;

typedef struct {
	int current;
	int power;
} bms_hv_current_value_data;

typedef struct {
	long timestamp;
	bms_hv_current_value_data value;
} bms_hv_current_data;

typedef struct {
	int error_code;
	int error_index;
	int active;
} bms_hv_errors_value_data;

typedef struct {
	long timestamp;
	bms_hv_errors_value_data value;
} bms_hv_errors_data;

typedef struct {
	bms_hv_temperature_data *temperature;
	int temperature_count;
	int temperature_size;
	bms_hv_voltage_data *voltage;
	int voltage_count;
	int voltage_size;
	bms_hv_current_data *current;
	int current_count;
	int current_size;
	bms_hv_errors_data *errors;
	int errors_count;
	int errors_size;
} bms_hv_data;

typedef struct {
	int accel_x;
	int accel_y;
	int accel_z;
} imu_acceleration_value_data;

typedef struct {
	long timestamp;
	imu_acceleration_value_data value;
} imu_acceleration_data;

typedef struct {
	imu_acceleration_data *acceleration;
	int acceleration_count;
	int acceleration_size;
} imu_data;

typedef struct {
	double latitude_safe;
	double longitude_safe;
	double latitude;
	double longitude;
	double altitude;
	char* ns_indicator;
	char* ew_indicator;
	char* utc_time;
} gps_gga_value_data;

typedef struct {
	long timestamp;
	gps_gga_value_data value;
} gps_gga_data;

typedef struct {
	double latitude;
	double longitude;
	char* ns_indicator;
	char* ew_indicator;
	char* utc_time;
} gps_gll_value_data;

typedef struct {
	long timestamp;
	gps_gll_value_data value;
} gps_gll_data;

typedef struct {
	double ground_speed_knots;
	double ground_speed_human;
} gps_vtg_value_data;

typedef struct {
	long timestamp;
	gps_vtg_value_data value;
} gps_vtg_data;

typedef struct {
	double latitude;
	double longitude;
	char* ns_indicator;
	char* ew_indicator;
	char* utc_time;
	char* date;
	double ground_speed_knots;
} gps_rmc_value_data;

typedef struct {
	long timestamp;
	gps_rmc_value_data value;
} gps_rmc_data;

typedef struct {
	gps_gga_data *gga;
	int gga_count;
	int gga_size;
	gps_gll_data *gll;
	int gll_count;
	int gll_size;
	gps_vtg_data *vtg;
	int vtg_count;
	int vtg_size;
	gps_rmc_data *rmc;
	int rmc_count;
	int rmc_size;
} gps_data;

typedef struct {
	int id;
	long timestamp;
	char* sessionName;
	bms_hv_data bms_hv;
	imu_data imu;
	gps_data gps;
} data_t;

