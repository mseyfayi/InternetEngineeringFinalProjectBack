
const express = require('express');
const redis = require('redis');
const log = require('./../logger/logger');
const getUserRoles = require('./../user/roles');

const redis_client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
redis_client.auth(process.env.REDIS_PASSWORD);

checkCache = (req, res, next) => {
	const {id} = req.params;

	redis_client.get(id, (err, data) => {
    if (err) {
        log(err);
        res.status(500).json(err);
    }
    //if no match found
    if (data) {
    	log('Read from cache');
        res.status(200).json(JSON.parse(data));
    } else {
      	next();
    }
  });
};


module.exports = {redis_client, checkCache};