function errorHandling(err,req,res,next){
    console.log('hahahahahhah')
    console.log(err)

    switch (err.name) {
        case "LoginError":
            res.status(401).json({message: "Error login user not found atau password not matched"})            
            break;
        case "Unauthenticated":
            res.status(401).json({message: "Error authentication"})
            break;
        case "Forbidden":
            res.status(403).json({message: "Forbidden error di authorization"})
            break;
        case "SequelizeValidationError":
            res.status(400).json({message: "Error validation saat create"})
            break;
        case "notFound":
            res.status(404).json({message: "Data not Found"})
            break;
        default:
            res.status(500).json({message: "Internal Server Error"})
            break;
    }
}

module.exports = errorHandling