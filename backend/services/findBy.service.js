const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");
const { resolve } = require("path");

const methods = {
  getGroupByCategory: function (body) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT g.* FROM `group` g INNER JOIN `category` c ON g.category_sys_id = c.category_sys_id where c.category_sys_id = ?";
      console.log("======================");
      console.log(body.category_sys_id);
      console.log("======================");
      db.query(sql, body.category_sys_id, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },
  getTypeByGroup: function (body) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT t.* FROM `type` t INNER JOIN `group` g ON t.group_sys_id = g.group_sys_id where g.group_sys_id = ?";
      console.log("======================");
      console.log(body.group_sys_id);
      console.log("======================");
      db.query(sql, body.group_sys_id, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },
  getProductByType: function (body) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT p.* FROM `product` p INNER JOIN `type` t ON p.type_sys_id = t.type_sys_id where t.type_sys_id = ?";
      console.log("======================");
      console.log(body.type_sys_id);
      console.log("======================");
      db.query(sql, body.type_sys_id, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },

  getProductByGroup: function (body) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT p.* FROM `product` p INNER JOIN `group` g ON p.group_sys_id = g.group_sys_id where g.group_sys_id = ?";
      console.log("======================");
      console.log(body.group_sys_id);
      console.log("======================");
      db.query(sql, body.group_sys_id, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },

  findAll: function() {
    return new Promise((resolve, reject) => {
        // db.connect(function(err){ console.log(err)});
        db.query("SELECT * FROM `provinces`",
            function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
        // db.end();
    });
},

  //  เลือก districts จาก provinces
  getDistrictsByProvinces: function (body) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT d.* FROM `districts` d  INNER JOIN `provinces` p ON d.province_id = p.id where p.id = ?";
      console.log("======================");
      console.log(body.id);
      console.log("======================");
      db.query(sql, body.id, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },

  //  เลือก subdistricts จาก districts
  getSubdistrictsByDistricts: function (body) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT s.* FROM `subdistricts` s INNER JOIN `districts` d ON s.district_id = d.id where d.id = ?";
      console.log("======================");
      console.log(body.id);
      console.log("======================");
      db.query(sql, body.id, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },

   //  เลือก ZipCode จาก subdistrictsID
   getZipCodeBySubdistricts: function (body) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT s.* FROM `subdistricts` s where s.id = ?";
      console.log("======================");
      console.log(body.id);
      console.log("======================");
      db.query(sql, body.id, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },














};
module.exports = { ...methods };
