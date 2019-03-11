const db = require("../db");

class User {
  static async findAll(data) {
    let baseQuery = `SELECT user_id, user_name, user_age, user_gender, last_location, lat, long
    FROM users`;
    let whereExpressions = [];
    let queryValues = [];

    if (+data.min_age >= +data.max_age) {
      throw new Error("Min age must be less than max age");
    }

    if (data.gender) {
      queryValues.push(data.gender);
      whereExpressions.push(`user_gender = $${queryValues.length}`);
    }

    if (data.dist && data.origin) {
      let [origLat, origLong] = [...data.origin.split(",")];

      queryValues.push(data.dist, origLat, origLong);

      whereExpressions.push(`3959 * acos (
        cos ( radians($${queryValues.length - 1}) )
        * cos( radians( lat ) )
        * cos( radians( long ) - radians($${queryValues.length}) )
        + sin ( radians($${queryValues.length - 1}) )
        * sin( radians( lat ) )
      ) <= $${queryValues.length - 2}`);
    }

    if (data.min_age) {
      queryValues.push(data.min_age);
      whereExpressions.push(`user_age >= $${queryValues.length}`);
    }

    if (data.max_age) {
      queryValues.push(data.max_age);
      whereExpressions.push(`user_age <= $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      baseQuery += " WHERE ";
    }

    // Finalize query and return results

    let finalQuery =
      baseQuery +
      whereExpressions.join(" AND ") +
      " ORDER BY user_id, last_location";

    const userObj = await db.query(finalQuery, queryValues);

    let userSet = new Set();

    let results = [];
    for (let user of userObj.rows) {
      if (userSet.has(user.user_id)) {
        results[
          results.findIndex(e => e.properties.id === user.user_id)
        ].locationHistory.features.push({
          type: "Feature",
          properties: { city: user.last_location },
          geometry: { type: "Point", coordinates: [+user.long, +user.lat] },
        });
      } else {
        userSet.add(user.user_id);
        let resultObj = {
          type: "user",
          locationHistory: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: { city: user.last_location },
                geometry: {
                  type: "Point",
                  coordinates: [+user.long, +user.lat],
                },
              },
            ],
          },
          properties: {
            id: user.user_id,
            name: user.user_name,
            age: user.user_age,
            gender: user.user_gender,
          },
        };
        results.push(resultObj);
      }
    }

    let num_results = userSet.size;

    let result = { results, num_results };
    return result;
  }
}

module.exports = User;
