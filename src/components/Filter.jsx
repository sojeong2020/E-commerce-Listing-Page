import React,{ useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import "../App.css";
import { fetchProducts } from "../utils/api";

const Filter = ({ onFilterChange }) => {
    const [facets, setFacets] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
          try {
            const data = await fetchProducts( "toilets", 1, 1);    
            setFacets(data.facets || []);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        getProducts();
      }, []);

  const handleCheckboxChange = (
    facetIdentifier,
    optionIdentifier,
    optionValue,
    isChecked
  ) => {
    console.log(`Checkbox changed: ${facetIdentifier}, ${optionIdentifier}, ${optionValue}, ${isChecked}`); 
    onFilterChange(facetIdentifier, optionIdentifier, optionValue, isChecked);
  };

  return (
    <div className="filter-section">
      <h4>Filter By</h4>

      {facets.map((facet) => (
        <Card key={facet.identifier} style={{ marginBottom: "10px" }}>
          <Card.Header>{facet.displayName}</Card.Header>

          <Card.Body>
            <Form>
              {facet.options.map((option) => (
                <Form.Check
                  key={option.identifier}
                  type="checkbox"
                  label={`${option.displayValue} (${option.productCount})`}
                  value={option.value}
                  onChange={(e) =>
                    handleCheckboxChange(
                      facet.identifier,
                      option.identifier,
                      option.value,
                      e.target.checked
                    )
                  }
                />
              ))}
            </Form>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Filter;
