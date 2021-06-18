import { useCallback } from "react";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Container from "./Components/Container";
import Category from "./Components/Category";
import PriceRange from "./Components/PriceRange";
import ApplyFilter from "./Components/ApplyFilter";
import {
  addMultipleQueryArg,
  removeMultipleQueryArg,
  addQueryLHSArg,
  removeQueryArg,
  stringifyQuery,
  getQueryObject,
  parseQuery,
} from "services/queryString";
import { formatToman } from "services/crrencyService";

function Filter({ categories, maxPrice }) {
  const router = useRouter();

  const setCategory = (e, catSlug) => {
    const isChecked = e.currentTarget.checked;

    let query = isChecked
      ? addMultipleQueryArg(router.query, "category", catSlug)
      : removeMultipleQueryArg(router.query, "category", catSlug);

    if (parseQuery(query).price) {
      console.log("delete-price");
      query = removeQueryArg(getQueryObject(query), "price[min]");
      query = removeQueryArg(getQueryObject(query), "price[max]");
    }

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const handleChangeMinPrice = (value) => {
    const query = addQueryLHSArg(router.query, "price", "min", value);

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const handleChangeMaxPrice = (value) => {
    const query = addQueryLHSArg(router.query, "price", "max", value);

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const handleDeleteAppliedFilter = (queryKey, queryValue) => {
    console.log({ queryKey, queryValue });
    let query = "";
    if (queryKey === "category") {
      query = removeMultipleQueryArg(router.query, "category", queryValue);

      if (parseQuery(query).price) {
        query = removeQueryArg(getQueryObject(query), "price[min]");
        query = removeQueryArg(getQueryObject(query), "price[max]");
      }
    }

    if (queryKey === "price") {
      query = removeQueryArg(router.query, "price[min]");

      query = removeQueryArg(getQueryObject(query), "price[max]");
    }

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const getApplyFilter = useCallback(() => {
    const query = parseQuery(stringifyQuery(router.query));

    const { category, q, price } = query;

    let categoryFilters = [];
    if (category) {
      categoryFilters = categories
        .filter((cat) => category.includes(cat.slug))
        .map((cat) => ({
          title: "دسته بندی: ",
          data: cat.title,
          key: "category",
          value: cat.slug,
        }));
    }

    const rangeFilter = [];
    if (price) {
      const min = price.min ? price.min : 0;
      const max = price.max ? price.max : maxPrice;

      const data = `از ${formatToman(min)} تا ${formatToman(max)}`;

      rangeFilter.push({
        title: "محدوده قیمت: ",
        data,
        key: "price",
        value: price,
      });
    }

    return {
      query,
      queryData: [...rangeFilter, ...categoryFilters],
    };
  }, [router.query]);

  const { query, queryData } = getApplyFilter();
  
  return (
    <Stack w="full" spacing={5} direction="column">
      {queryData.length > 0 && (
        <Container title="فیلترهای اعمال شده">
          <ApplyFilter
            items={queryData}
            onDeleteAppliedFilter={handleDeleteAppliedFilter}
          />
        </Container>
      )}
      <Container title="دسته بندی">
        <Category
          items={categories}
          onSetCategory={setCategory}
          defaultValue={query.category ? query.category : []}
        />
      </Container>
      <Container title="محدوده قیمت">
        <PriceRange
          maxPrice={maxPrice}
          onMinChange={handleChangeMinPrice}
          onMaxCahnge={handleChangeMaxPrice}
          defaultPrice={query.price ? query.price : {}}
        />
      </Container>
    </Stack>
  );
}

export default Filter;
