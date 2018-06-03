module.exports = {
    getAllResponse(docs) {
            return {
                count : docs.length,
                products : docs.map(doc => {
                    return {
                        name : doc.name,
                        price : doc.price,
                        _id : doc._id,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
    },
    getSingleResponse(doc) {
        return {
                product : doc,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/products/' + doc._id
                }
            }
    },
    getUpdatedResponse(result, id){
        return {
            updatedProduct : result,
            request : {
                type : 'GET',
                url : 'http://localhost:3000/products/' + id
            }
        }
    },
    getDeletedResponse(){
        return {
            deletedProduct : true
        }
    },
    postResponse(result){
        return {
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/products/' + result._id
                }
            }

        }
    }
}