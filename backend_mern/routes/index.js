const express = require("express")
const clUploadController = require("../controller/customer_location/upload_cl")
const clFindController = require("../controller/customer_location/find_cl")
const cnUploadController = require("../controller/customer_name/upload_cn")
const cnFindController = require("../controller/customer_name/find_cn")
const crUploadController = require("../controller/claim_responsibility/upload_cr")
const crFindController = require("../controller/claim_responsibility/find_cr")
const ctUploadController = require("../controller/customer_type/upload_ct")
const ctFindController = require("../controller/customer_type/find_ct")
const tocUploadController = require("../controller/type_of_claim/upload_toc")
const tocFindController = require("../controller/type_of_claim/find_toc")
const pftUploadController = require("../controller/part_filter_data/upload_pft")
const pftFindController = require("../controller/part_filter_data/find_pft")


const router = express.Router()

//worker
// router.post('/workerPickingUpload',uploadPickerController)

//cl
router.post('/cl-upload',clUploadController)
router.post('/cl-find',clFindController)


//cn
router.post('/cn-upload',cnUploadController)
router.post('/cn-find',cnFindController)


//cr
router.post('/cr-upload',crUploadController)
router.post('/cr-find',crFindController)


//ct
router.post('/ct-upload',ctUploadController)
router.post('/ct-find',ctFindController)


//toc
router.post('/toc-upload',tocUploadController)
router.post('/toc-find',tocFindController)

//pft
//toc
router.post('/pft-upload',pftUploadController)
router.post('/pft-find',pftFindController)


module.exports = router