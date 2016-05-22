var mongoose = require("mongoose")
var Schema = mongoose.Schema

var { Graph } = require("./graph.js")

var ProgramSchema = new Schema({
	graphs: { type: [ Graph.schema ] },
	name: { type: String, required: true },
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now },
	status: { type: String, enum: ["private", "public", "shared"], default: "private" }
})

ProgramSchema.pre('save', function(next) {
	this.modified = Date.now()
	next()
})

var ProgramModel = mongoose.model("Program", ProgramSchema)

module.exports = ProgramModel