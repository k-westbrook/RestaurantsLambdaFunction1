var { Client } = require('pg')
exports.handler = async function () {
  try {

    const client = new Client({
      host: process.env.HOST_REFERENCE,
      user: process.env.USER_NAME,
      password: process.env.PASSWORD_REFERENCE,
      database: process.env.DATABASE_NAME
    });
    await client.connect();
    let results = await client.query('WITH CTE AS (SELECT First.restaurant_name, Second.location_name,First.restaurant_neighborhood,First.photo_url,First.review,First.rating FROM public."Restaurant" AS First LEFT JOIN public."Restaurant_Location" AS Second on First.restaurant_location = Second.location_id) SELECT CTE.restaurant_name,CTE.location_name, Third.neighborhood_name,CTE.photo_url,CTE.review,CTE.rating FROM CTE LEFT JOIN public."Restaurant_Neighborhood" AS Third ON CTE.restaurant_neighborhood = Third.neighborhood_id;');
    return results.rows;

  } catch (err) {
    return err;
  }
}




