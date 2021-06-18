import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { getAllProduct, getFilteredProducts } from "services/productService";
import { getCategories } from "services/categoryService";

import Products from "components/Products";
import Layout from "components/Layout";
import Filter from "components/Filter";

function Index({ products, maxPrice, categories }) {
  // const [productsList, setProductsList] = useState(products);

  const router = useRouter();

  // useEffect(() => {
  //   const query = new URLSearchParams(router.query).toString();
  //   console.log(query);
  //   if (query) {
  //     console.log(router.query);
  //     getFilteredProducts(query)
  //       .then((res) => {
  //         setProductsList(res.data.products);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [router.query]);

  return (
    <Layout title="محصولات">
      <Flex direction="row" pb={10}>
        <Flex w="25%" pt={3}>
          <Filter categories={categories} maxPrice={maxPrice} />
        </Flex>
        <Flex w="75%">
          <Products data={products} />
        </Flex>
      </Flex>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const products = await getAllProduct();
//   const categories = await getCategories();

//   return {
//     props: {
//       products: products.data,
//       maxPrice: products.maxPrice,
//       categories,
//     },
//     revalidate: 10,
//   };
// }

export async function getServerSideProps(params) {
  const query = params.query;

  const products = await getAllProduct(query);
  const categories = await getCategories();

  return {
    props: {
      products: products.data,
      maxPrice: products.maxPrice,
      categories,
    },
  };
}

export default Index;
