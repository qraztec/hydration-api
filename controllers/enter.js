const handleEnter = (req, res, db) => {
    const {name,bottlesCleaned, soapLevel, sanitation, numBottlesFilled} = req.body;
    if (!name || !bottlesCleaned || !soapLevel || !sanitation || !numBottlesFilled) {
        return res.status(400).json('incorrect for submission')
    }
    
        db.transaction(trx => {
            console.log(soapLevel)
            trx.insert({
                name: name,
                bottlesCleaned: bottlesCleaned,
                soapLevel: soapLevel,
                sanitation: sanitation,
                numBottlesFilled: numBottlesFilled
            })
            .into('sensors')
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => res.status(400).json('unable to enter'))
    

}

module.exports = {
    handleEnter: handleEnter
}