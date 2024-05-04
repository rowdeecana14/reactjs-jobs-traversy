export const TYPES = {
  INPUT: "input",
  FETCH: "fetch",
};

export const INITIALS = {
  is_valid_form: false,
  fields: {
    type: "Full-Time",
    title: "",
    description: "",
    salary: "Under $50K",
    location: "",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  },
  errors: [],
};

export function formReducer(state, action) {
  switch (action.type) {
    case TYPES.INPUT: {
      const { field } = action;

      const updated = { ...state };
      const properties = field.name.split("."); // Split the path string into an array of property names

      if (properties.length > 1) {
        let current = updated.fields;

        // Traverse the object based on the properties array
        for (let i = 0; i < properties.length - 1; i++) {
          current = current[properties[i]];
          if (typeof current !== "object" || current === null) return; // Stop if encountered a non-object
        }

        // Update the value of the last property
        current[properties[properties.length - 1]] = field.value;
      } else {
        updated.fields[properties[0]] = field.value;
      }

      return updated;
    }
    case TYPES.FETCH: {
      const updated = { ...state };
      updated.fields = action.fields;

      return updated;
    }
    default: {
      return state;
    }
  }
}
