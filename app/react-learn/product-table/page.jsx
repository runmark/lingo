"use client";

import { useState } from "react";

const ProductCategoryRow = ({ catetory }) => {
    return (
        <tr>
            <th colSpan="2">{catetory}</th>
        </tr>
    );
};

const ProductRow = ({ product }) => {

    const name = product.stocked ? product.name : (
        <span style={{ color: 'red' }}>
            product.name
        </span>
    );

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
};


const ProductTable = ({ products, filterText, inStockOnly }) => {

    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {

        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }

        if (inStockOnly && !product.stocked) {
            return;
        }

        if (lastCategory !== product.category) {
            rows.push(
                <ProductCategoryRow
                    key={product.category}
                    catetory={product.category}
                />
            );
        }

        // if (
        //     (!filterText || product.name.contains(filterText))
        //     && (!inStockOnly || product.stocked)
        // ) {
        //     rows.push(
        //         <ProductRow
        //             key={product.name}
        //             product={product}
        //         />
        //     );
        // }

        rows.push(
            <ProductRow
                key={product.name}
                product={product}
            />
        );

        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

const SearchBar = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) => {
    return (
        <form>
            <input type="text"
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}
                placeholder="Search..."
            />
            <label>
                <input type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                />
                {' '}
                Only show products in stock
            </label>
        </form>
    );
};


const FilterableProductTable = ({ products }) => {

    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    return (<>
        <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockOnlyChange={setInStockOnly}
        />
        <ProductTable
            products={products}
            filterText={filterText}
            inStockOnly={inStockOnly}
        />
    </>);
};

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

const ReactLearnPage = () => {
    return (
        <FilterableProductTable products={PRODUCTS} />
    );
}

export default ReactLearnPage;