module.exports = {
	generalGet : `query { posts { _id description title
											comments { title }
                  }}`
};