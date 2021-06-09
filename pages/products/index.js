import { Flex } from "@chakra-ui/react";

import { getAllProduct } from "services/productService";
import Products from "components/Products";
import Layout from "components/Layout";

function Index({ products }) {
  return (
    <Layout title="محصولات">
      <Flex>
        <Products data={products} />
      </Flex>
    </Layout>
  );
}

export async function getStaticProps() {
  const products = await getAllProduct();

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

export default Index;
