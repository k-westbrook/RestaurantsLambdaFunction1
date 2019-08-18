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
    let results = await client.query('WITH CTE AS (SELECT First.id, First.restaurant_name, Second.location_name,First.restaurant_neighborhood,First.photo_url,First.review,First.food_type_id,First.rating FROM public."Restaurant" AS First LEFT JOIN public."Restaurant_Location" AS Second  ON First.restaurant_location = Second.location_id),CTE2 AS(SELECT CTE.id, CTE.restaurant_name,CTE.location_name, Third.neighborhood_name,CTE.photo_url,CTE.review, CTE.rating, CTE.food_type_id FROM CTE LEFT JOIN public."Restaurant_Neighborhood" AS Third ON CTE.restaurant_neighborhood = Third.neighborhood_id) SELECT CTE2.id,CTE2.restaurant_name, CTE2.location_name, CTE2.neighborhood_name, CTE2.photo_url, CTE2.review, CTE2.rating, Fourth.food_type FROM CTE2 LEFT JOIN public."Restaurant_FoodType" AS Fourth ON Fourth.id = CTE2.food_type_id;');


    let response =
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: results.rows,
    };
    return response;

  } catch (err) {
    return err;
  }
}




