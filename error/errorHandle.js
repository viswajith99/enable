const genericErrorhandle=async (error,req,res)=>{
    try {
        const statuscode=error.statuscode||400;
        const message=error.message || 'something went wrong try again'
        return res.status(statuscode).json({
            message:message,
        })
        
    } catch (error) {
        res.status(500).json({
            message:'something went wrong'
        })
        
    }
}
module.exports={genericErrorhandle}