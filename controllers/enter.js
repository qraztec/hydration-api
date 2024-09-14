const handleEnter = async(req, res, db) => {
    const {name,bottlesCleaned, soapLevel, sanitation, numBottlesFilled} = req.body;
    if (!name || !bottlesCleaned || !soapLevel || !sanitation || !numBottlesFilled) {
        return res.status(400).json('incorrect for submission')
    }
    try {
        console.log(name)
        await db.transaction(async (trx) => {
            
            await trx('sensors').insert({
                name: name,
                bottlescleaned: bottlesCleaned,
                soaplevel: soapLevel,
                sanitation: sanitation,
                numbottlesfilled: numBottlesFilled
            })
        })
        res.status(200).json("successfully entered")
    }
    catch (err) {
        console.error('Database transaction error:', err);
        res.status(500).json('unable to enter into database')
    }
        
    
    

}

module.exports = {
    handleEnter: handleEnter
}