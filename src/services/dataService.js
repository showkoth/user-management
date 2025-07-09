import Parse from "parse";
import { APPLICATION_ID, JAVASCRIPT_KEY, SERVER_URL } from "../environments";

// Initialize Parse
Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
Parse.serverURL = SERVER_URL;

// Function to fetch data from Back4App
export const getParsedData = async () => {
  try {
    console.log("Attempting to fetch data from Back4App...");
    console.log("Parse initialized with:", {
      APPLICATION_ID,
      SERVER_URL,
      JAVASCRIPT_KEY: JAVASCRIPT_KEY.substring(0, 10) + "...",
    });

    // Example: Fetch from a Parse class called "Person"
    const Person = Parse.Object.extend("Person");
    const query = new Parse.Query(Person);

    console.log("Executing query...");
    const results = await query.find();
    console.log("Query results:", results);

    // Convert Parse objects to plain JavaScript objects
    const data = results.map((person) => ({
      id: person.id,
      name: person.get("name") || "Unknown",
      age: person.get("age") || 0,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
      // Add other fields as needed
      ...person.attributes,
    }));

    // If no results found, return default data
    if (data.length === 0) {
      return [
        {
          name: "Alice",
          age: 25,
          message: "No data found in Back4App, showing default",
        },
      ];
    }

    return data;
  } catch (error) {
    console.error("Error fetching data from Back4App:", error);

    // Fallback to default data in case of error
    return [
      {
        name: "Alice",
        age: 25,
        error: error.message,
        message: "Error fetching from Back4App, showing fallback data",
      },
    ];
  }
};

// Additional helper function to create a new person
export const createUser = async (userData) => {
  try {
    console.log("Creating person with data:", userData);
    const Person = Parse.Object.extend("Person");
    const person = new Person();

    // Set person attributes
    Object.keys(userData).forEach((key) => {
      person.set(key, userData[key]);
    });

    console.log("Saving person to Back4App...");
    const result = await person.save();
    console.log("Person saved successfully:", result);
    return {
      id: result.id,
      ...userData,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  } catch (error) {
    console.error("Error creating person:", error);
    throw error;
  }
};
