import { Flex } from "@chakra-ui/react";

import { getAllProduct, getProductByID } from "services/productService";
import Product from "components/Product";
import Layout from "components/Layout";

function ProductPage({ product }) {
  return (
    <Layout title={product.title}>
      <Flex>
        <Product data={product} />
      </Flex>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const product = await getProductByID(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const products = await getAllProduct();

  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default ProductPage;
