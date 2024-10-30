import React from "react";
import { Card } from "react-bootstrap";
import "../App.css";

const ProductCard = ({ product }) => (
  <Card key={product.id} className="product-card">
    <Card.Img variant="top" src={product.image.url} alt={product.productName} />

    <Card.Body className="product-card-body">
      <img
        className="product-brand-image"
        src={product.brand.brandImage.url}
        alt={product.brand.name}
      />
      <Card.Title>{product.productName}</Card.Title>
      <Card.Text>
        £{product.price.priceIncTax}{" "}
        <span className="was-price">
          {product.price.wasPriceIncTax ? "Was: £" : ""}{" "}
          {product.price.wasPriceIncTax}
        </span>
      </Card.Text>
      <Card.Text>
        {" "}
        {product.stockStatus.status === "G" ? "In stock" : ""}
      </Card.Text>
      <Card.Text> reviewsCount:{product.reviewsCount}</Card.Text>
    </Card.Body>
  </Card>
);

export default ProductCard;
