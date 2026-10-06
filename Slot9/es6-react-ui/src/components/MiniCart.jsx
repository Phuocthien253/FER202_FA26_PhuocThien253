import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { cartItems } from '../data/cart';
import { formatVND } from '../utils/format';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

const MiniCart = () => {
  const [items, setItems] = useState(cartItems);

  const changeQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                Math.max(
                  MIN_QUANTITY,
                  item.quantity + delta
                )
              ),
            }
          : item
      )
    );
  };

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h3 className="mb-3">Mini Cart</h3>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>

              <td>{formatVND(item.price)}</td>

              <td>
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      changeQuantity(item.id, -1)
                    }
                    disabled={
                      item.quantity <= MIN_QUANTITY
                    }
                  >
                    −
                  </Button>

                  <Button
                    variant="light"
                    disabled
                  >
                    {item.quantity}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      changeQuantity(item.id, 1)
                    }
                    disabled={
                      item.quantity >= MAX_QUANTITY
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>

              <td>
                {formatVND(
                  item.price * item.quantity
                )}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th colSpan="2">Tổng cộng</th>
            <th>{totalQuantity}</th>
            <th>{formatVND(totalPrice)}</th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default MiniCart;