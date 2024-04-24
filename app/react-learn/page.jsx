
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


const ProductTable = ({ products }) => {

    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (lastCategory !== product.category) {
            rows.push(
                <ProductCategoryRow
                    key={product.category}
                    catetory={product.category}
                />
            );
        }

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


const FilterableProductTable = ({ products }) => {
    return (<>
        {/* <SearchBar /> */}
        <ProductTable products={products} />
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