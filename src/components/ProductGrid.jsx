import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import "../App.css";
import { fetchProducts } from "../utils/api";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("toilets");
  const [sort, setSort] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [total, setTotal] = useState(0);
 // const [facets, setFacets] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(
          query,
          pageNumber,
          sort,
          selectedFilters
        );
        console.log(data, "data");

       // setFacets(data.facets || []);
        setProducts(data.products || []);
        setTotal(data.pagination?.total || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [query, pageNumber, sort, selectedFilters]);

  const handleFilterChange = (
    facetIdentifier,
    optionIdentifier,
    value,
    isChecked = false
  ) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      console.log(newFilters,"newFilters")

      if (!newFilters[facetIdentifier]) {
        newFilters[facetIdentifier] = [];
      }

      if (isChecked) {
        console.log(isChecked,"isChecked")
    
        const existingIndex = newFilters[facetIdentifier].findIndex(
          (item) => item.identifier === optionIdentifier
        );
        if (existingIndex > -1) {
          newFilters[facetIdentifier][existingIndex].value = value;
        } else {
          newFilters[facetIdentifier].push({
            identifier: optionIdentifier,
            value,
          });
        }
      } 
      console.log(newFilters, "newFilters");
       return newFilters;
    });
  };

  return (
    <Container>
      <Form className="product-list-form">
        <Form.Group controlId="sort">
          <Form.Label>Sort By</Form.Label>
          <Form.Control
            as="select"
            value={sort}
            onChange={(e) => setSort(Number(e.target.value))}
          >
            <option value={1}>Recommended</option>
            <option value={2}>Price Low to High</option>
            <option value={3}>Price High to Low</option>
            <option value={4}>Largest Discount</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <p className="product-list-total"> {total} results</p>

      <Row>
        <Col md={3}>
          <Filter onFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <div className="button-row">
        <Button onClick={() => setPageNumber(pageNumber + 1)}>LOAD MORE</Button>
      </div>
    </Container>
  );
};

export default ProductGrid;
