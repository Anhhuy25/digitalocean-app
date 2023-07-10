export const ERROR_CODE = {
  invalid_input: "invalid_input",
  store_message_failed: "store_message_failed",
  not_connect_database: "not_connect_database",
};
export const STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
};
export const connectionString = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@${process.env.NEXT_PUBLIC_DB_CLUSTER}.pv9k3cl.mongodb.net/?retryWrites=true&w=majority`;
export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
