module.exports  = (req, res, next) => {
    if(req.user){
        if(req.user.role == 'admin') {
            console.log('checkRole', req.user)
            next()
        } else {
            console.log('checkRole', req.user)
            res.status(403).json({  
                errors: [{ msg: 'You must be logged in as an administrator to do that' }]
            })
        }
    } else {
        res.status(401).json({ 
            errors: [{ msg: 'Authorization denied for users.' }]
        })
    }
}