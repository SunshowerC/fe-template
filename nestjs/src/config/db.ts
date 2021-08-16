

const localDB = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
}

const gcpDB = {
  username: 'root',
  host: '34.97.173.215',  
  port: 8806,
  password: 'MDbai1@3',

  database: 'fund',
}


export const DB_CONFIG = {
  ...gcpDB
}