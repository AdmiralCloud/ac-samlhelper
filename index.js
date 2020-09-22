const _ = require('lodash')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')

const beautify = require("json-beautify");
const xml2js = require('xml2js');


/**
 * Insert a JSON (file) and convert it to base64 encoded XML File that can be used with samlCallback of auth server
 */

 const convertFromJSON = (params, cb) => {
  const file = _.get(params, 'file')
  if (!file) return cb({ message: 'fileIsRequired' })
  fs.readFile(file, (err, result) => {
    if (err) return cb(err)
    let json = JSON.parse(result.toString())
    //let xml64 = jsonxml(json).toString('base64')
    // let xml = jsonxml(json)

    var builder = new xml2js.Builder({ headless: true, renderOpts: { pretty: false } })
    var xml = builder.buildObject(json);

    console.log(xml, typeof xml)
    let xml64 = Buffer.from(xml).toString('base64')
    return cb(null, xml64)
  })
 }

 const convertSAMLResponse = (params, cb) => {
  const file = _.get(params, 'file')
  if (!file) return cb({ message: 'fileIsRequired' })
  const path = _.get(params, 'path', 'samlp:Response.Assertion[0].AttributeStatement[0]')
  fs.readFile(file, (err, result) => {
    if (err) return cb(err)
    const decoded = Buffer.from(result.toString(), 'base64').toString('utf-8')
    console.log(decoded)
    console.log('...', typeof decoded)
    var parseString = require('xml2js').parseString;
    parseString(decoded, function (err, result) {
      console.log(_.pad('RESPONSE', 80, '-'))
      console.log(err, result);
      console.log(_.pad('PATH: ' + path, 80, '-'))
      console.log(beautify(_.get(result, path), null, 2, 100));


    });
  })
 }

const convertFromXML = (params, cb) => {
  const file = _.get(params, 'file')
  if (!file) return cb({ message: 'fileIsRequired' })
  fs.readFile(file, (err, result) => {
    if (err) return cb(err)
    let xml64 = Buffer.from(result).toString('base64')
    return cb(null, xml64)
  })
}

 if (_.get(argv, 'fromJSON')) {
  convertFromJSON({ file: _.get(argv, 'file') }, (err, result) => {
    if (err) throw err
    console.log(result)
    process.exit(0)
  })
 }
 if (_.get(argv, 'fromSAML')) {
  convertSAMLResponse({ file: _.get(argv, 'file'), path: _.get(argv, 'path') }, (err, result) => {
    if (err) throw err
    console.log(beautify(result, null, 2, 100));

    process.exit(0)
  })
 }
 if (_.get(argv, 'fromXML')) {
  convertFromXML({ file: _.get(argv, 'file') }, (err, result) => {
    if (err) throw err
    console.log(result)
    process.exit(0)
  })
 }

