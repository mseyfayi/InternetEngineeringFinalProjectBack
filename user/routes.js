const express = require('express');
const axios = require('axios');
const getUserRoles = require('./roles');
const jwtAuthz = require("express-jwt-authz");
var defaultRoles = require("./defaultRoles");
const service = require('./../formAnswer/service');

const router = express.Router();
AUTH0_MGMT_API_ACCESS_TOKEN = process.env.AUTH0_MGMT_API_ACCESS_TOKEN;

const roles = defaultRoles;

let apiManagementHeaders = {
  headers: {
    Authorization: `Bearer ${AUTH0_MGMT_API_ACCESS_TOKEN}`
  }
};

router.get('/roles', (req, res) => {
	getUserRoles(req.user.sub).then((result) =>{
		console.log(result);
		return res.status(200).json(result.data);
	}).catch((err)=> {
		console.log(err);
		res.status(500).json(err);
	});
});

router.get('/test', (req, res) => {
	updateAccessToken().then(result => {
		res.status(200).json(result);
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	})
})

router.get('/form-answers', (req , res)=>{
	service.findAllAnswers(req.user.sub).then(result=>{
		return res.status(result.status).json(result.body);
	}).catch(err=>{
		return res.status(err.status).json(err.body);
	});
})



module.exports = router;
