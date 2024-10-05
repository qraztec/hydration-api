// POST: Add new entry to the database
const handlePost = async (req, res, db) => {
    const { name, bottlesCleaned, soapLevel, sanitation, numBottlesFilled } = req.body;
    if (name == undefined || bottlesCleaned == undefined || soapLevel == undefined || sanitation == undefined || numBottlesFilled == undefined) {
      return res.status(400).json({
      message: 'incorrect form submission',
      receivedData: JSON.stringify(req.body)
    });
    }
    try {
      await db.transaction(async (trx) => {
        await trx('sensors').insert({
          name: name,
          bottlescleaned: bottlesCleaned,
          soaplevel: soapLevel,
          sanitation: sanitation,
          numbottlesfilled: numBottlesFilled,
        });
      });
      res.status(200).json('successfully entered');
    } catch (err) {
      console.error('Database transaction error:', err);
      res.status(500).json('unable to post into database');
    }
  };
  
  // GET: Retrieve entries from the database
  const handleGet = async (req, res, db) => {
    const { name } = req.query;
    try {
      let query = db('sensors');
      if (name) {
        query = query.where({ name });
      }
      const result = await query.select('*');
      res.status(200).json(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json('unable to fetch data');
    }
  };
  
  // PUT: Update an existing entry in the database
  const handlePut = async (req, res, db) => {
    const { id, name, bottlesCleaned, soapLevel, sanitation, numBottlesFilled } = req.body;
    if (!id) {
      return res.status(400).json('ID is required to update entry');
    }
  
    try {
      const updatedRows = await db('sensors')
        .where({ id })
        .update({
          name: name,
          bottlescleaned: bottlesCleaned,
          soaplevel: soapLevel,
          sanitation: sanitation,
          numbottlesfilled: numBottlesFilled,
        });
  
      if (updatedRows) {
        res.status(200).json('entry successfully updated');
      } else {
        res.status(404).json('entry not found');
      }
    } catch (err) {
      console.error('Error updating entry:', err);
      res.status(500).json('unable to update entry');
    }
  };
  
  // DELETE: Remove an entry from the database
  const handleDelete = async (req, res, db) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json('ID is required to delete entry');
    }
  
    try {
      const deletedRows = await db('sensors').where({ id }).del();
      if (deletedRows) {
        res.status(200).json('entry successfully deleted');
      } else {
        res.status(404).json('entry not found');
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
      res.status(500).json('unable to delete entry');
    }
  };
  
  module.exports = {
    handlePost,
    handleGet,
    handlePut,
    handleDelete,
  };
  
