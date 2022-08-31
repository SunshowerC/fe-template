

const localDB = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
}

const gcpDB = {
  username: 'root',
  // host: '34.97.173.215',  
  // port: 8806,
  // password: 'MDbai1@3',
  
  host: '127.0.0.1',  
  port: 3306,
  password: '12345678',
  
  database: 'fund_tab',
}


export const DB_CONFIG = {
  ...gcpDB
}