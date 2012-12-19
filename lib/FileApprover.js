var fs = require('fs');

var FileApprover = function () { };
FileApprover.verify = function (namer, writer, reporter) {

	var approvedFileName = namer.getApprovedFile(writer.getFileExtension());
	var receivedFileName = namer.getReceivedFile(writer.getFileExtension());

	writer.write(receivedFileName);

	var throwReporterError = function (msg) {
		reporter.report(approvedFileName, receivedFileName);

		throw msg;
	}

	if (!fs.existsSync(approvedFileName)) {
		throwReporterError("Approved file does not exist: " + approvedFileName);
	}

	if (fs.statSync(approvedFileName).size !== fs.statSync(receivedFileName).size) {
		throwReporterError("File sizes do not match: Approved:[" + approvedFileName + "] Received:[" + receivedFileName + "]");
	}

	var approvedFileBuffer = fs.readFileSync(approvedFileName);
	var receivedFileBuffer = fs.readFileSync(receivedFileName);

	for(var i = 0, bufferLength = approvedFileBuffer.length; i < bufferLength; i++){
		if(approvedFileBuffer[i] !== receivedFileBuffer[i]){
			throwReporterError("Files do not match: Approved:[" + approvedFileName + "] Received:[" + receivedFileName + "]");
		}
	}
}


module.exports = FileApprover;