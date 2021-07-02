import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Badge,
} from "@chakra-ui/react";

import { formatToman } from "services/crrencyService";

function OrdersList({ orders }) {
  const renderOrders = orders.map((order) => (
    <Tr key={order.id}>
      <Td textAlign="center">#</Td>
      <Td textAlign="center">{formatToman(order.totalPrice)}</Td>
      <Td textAlign="center">{order.createdAt.fa}</Td>
      <Td textAlign="center">{order.updatedAt.fa}</Td>
      <Td textAlign="center">
        <Badge p={2} colorScheme="orange">
          {order.status.title}
        </Badge>
      </Td>
    </Tr>
  ));

  return (
    <Table variant="striped" colorScheme="purple">
      <Thead backgroundColor="blue.600">
        <Tr>
          <Th textAlign="center" color="white">
            شناسه
          </Th>
          <Th textAlign="center" color="white">
            مبلغ کل
          </Th>
          <Th textAlign="center" color="white">
            تاریخ ایجاد
          </Th>
          <Th textAlign="center" color="white">
            تاریخ بروزرسانی
          </Th>
          <Th textAlign="center" color="white">
            وضعیت
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.length === 0 && (
          <Tr>
            <Td colSpan={5}>سفارشی ثبت نشده است!</Td>
          </Tr>
        )}
        {orders.length > 0 && <> {renderOrders} </>}
      </Tbody>
      <Tfoot backgroundColor="blue.600">
        <Tr>
          <Th textAlign="center" color="white">
            شناسه
          </Th>
          <Th textAlign="center" color="white">
            مبلغ کل
          </Th>
          <Th textAlign="center" color="white">
            تاریخ ایجاد
          </Th>
          <Th textAlign="center" color="white">
            تاریخ بروزرسانی
          </Th>
          <Th textAlign="center" color="white">
            وضعیت
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}

export default OrdersList;
