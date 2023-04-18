'use client';
import { useEffect, useState } from 'react';
import { Button, Modal, IconType, ButtonVariant } from '@/components';
import { Movie } from '@/types';
import {
  TICKET_OPTIONS,
  MAX_TICKET_COUNT,
  MIN_TICKET_COUNT,
  CURRENCIES,
} from '@/constants';
import { formatCurrency } from '@/utils';
import { useCart } from '@/hooks/';

export interface IBuyButtonProps {
  item?: Movie;
}

const initialTicketsCounts = {
  adult: 0,
  child: 0,
  senior: 0,
};

export const BuyButton = ({ item }: IBuyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketCounts, setTicketCounts] = useState<{ [key: string]: number }>(
    initialTicketsCounts
  );
  const [totalCost, setTotalCost] = useState(0);
  const { locale, currency } = CURRENCIES.unitedStates;
  const { addItem } = useCart();

  useEffect(() => {
    const newTotalCost = Object.values(TICKET_OPTIONS).reduce(
      (total, ticket) => {
        const ticketCount = ticketCounts[ticket.type] || 0;
        return total + ticketCount * ticket.price;
      },
      0
    );

    setTotalCost(newTotalCost);
  }, [ticketCounts]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setTicketCounts(initialTicketsCounts);
    setIsOpen(false);
  };

  const handleTicketCountChange = (type: string, value: string) => {
    const count =
      value === '' || parseInt(value) > MAX_TICKET_COUNT
        ? 0
        : parseInt(value) || 0;
    setTicketCounts((prevTicketCounts) => ({
      ...prevTicketCounts,
      [type]: count,
    }));
  };

  const handleIncrement = (type: string) => {
    if (!!ticketCounts[type] && ticketCounts[type] >= MAX_TICKET_COUNT) return;

    setTicketCounts((prevTicketCounts) => ({
      ...prevTicketCounts,
      [type]: prevTicketCounts[type] + 1,
    }));
  };

  const handleDecrement = (type: string) => {
    if (ticketCounts[type] <= MIN_TICKET_COUNT) return;
    setTicketCounts((prevTicketCounts) => ({
      ...prevTicketCounts,
      [type]: prevTicketCounts[type] - 1,
    }));
  };

  const handleAddToCart = () => {
    if (!item) return;
    Object.keys(ticketCounts).forEach((element) => {
      if (ticketCounts[element] === 0 || '') return;
      addItem({
        id: `${element}${item?.id}`,
        name: item?.title || '',
        price: ticketCounts[element] * TICKET_OPTIONS[element].price,
        quantity: ticketCounts[element],
        type: element,
      });
    });
  };

  return (
    <>
      <Button
        label="Buy Now"
        className="w-full md:basis-7/12"
        labelClassName="text-lg"
        handleClick={openModal}
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="font-bold text-center mb-8 leading-normal">
          {item && item.title}
        </h2>
        <div className="w-full">
          <div className="w-full flex mb-4">
            <h4 className="w-1/2 text-left sm:text-center">Tickets</h4>
            <h4 className="w-1/2 text-center">Quantity</h4>
          </div>
          <div className="w-full flex flex-wrap mt-4">
            {Object.values(TICKET_OPTIONS).map((ticket) => (
              <div key={ticket.type} className="w-full flex mb-4">
                <div className="flex justify-start sm:justify-center items-center w-1/2">
                  <span className=" mr-2 font-bold capitalize">
                    {ticket.type}
                  </span>
                  {formatCurrency(locale, currency, ticket.price, 2)}
                </div>
                <div className="flex w-1/2 justify-end sm:justify-center items-center">
                  <Button
                    handleClick={() => handleIncrement(ticket.type)}
                    iconType={IconType.PLUS}
                    variant={ButtonVariant.ICON}
                    className="!w-10 lg:!w-16"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    min={MIN_TICKET_COUNT}
                    max={MAX_TICKET_COUNT}
                    className={
                      'border border-neutral-gray bg-black-transparent text-white rounded-md' +
                      ' px-2 py-1 w-20 mx-2 outline-none text-center'
                    }
                    value={ticketCounts[ticket.type] || ''}
                    onChange={(e) =>
                      handleTicketCountChange(ticket.type, e.target.value)
                    }
                  />
                  <Button
                    handleClick={() => handleDecrement(ticket.type)}
                    iconType={IconType.MINUS}
                    variant={ButtonVariant.ICON}
                    className="!w-10 lg:!w-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-neutral-gray-light my-4 text-center italic">
          You can only buy {MAX_TICKET_COUNT} tickets tickets
        </p>
        <p className="mt-4 font-bold text-center text-xl">
          Total cost: {formatCurrency(locale, currency, totalCost, 2)}
        </p>

        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-around mt-4">
          <Button
            className="w-full md:w-64 capitalize"
            variant={ButtonVariant.SECONDARY}
            label="Cancel"
            handleClick={closeModal}
          />
          <Button
            className="w-full md:w-64 capitalize"
            label="Confirm purchase"
            handleClick={() => {
              handleAddToCart();
              closeModal();
            }}
          />
        </div>
      </Modal>
    </>
  );
};
