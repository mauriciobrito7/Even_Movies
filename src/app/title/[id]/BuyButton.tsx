'use client';
import { useEffect, useState } from 'react';
import { Button, Modal, IconType, ButtonVariant } from '@/components';
import { IMovie } from '@/types';
import {
  TICKET_OPTIONS,
  MAX_TICKET_COUNT,
  MIN_TICKET_COUNT,
} from '@/constants/tickets';

export interface IBuyButtonProps {
  item?: IMovie;
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
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
    if (ticketCounts[type] >= MAX_TICKET_COUNT) return;

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

  useEffect(() => {
    const newTotalCost = TICKET_OPTIONS.reduce((total, ticket) => {
      const ticketCount = ticketCounts[ticket.type] || 0;
      return total + ticketCount * ticket.price;
    }, 0);

    setTotalCost(newTotalCost);
  }, [ticketCounts]);

  return (
    <>
      <Button
        label="Buy Now"
        className="sm:basis-7/12"
        labelClassName="text-lg"
        handleClick={openModal}
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          You are buying a ticket for {item && item.title}
        </h2>
        <p className="text-neutral-gray-light mb-4">
          Just can buy {MAX_TICKET_COUNT} tickets
        </p>
        {TICKET_OPTIONS.map((ticket) => (
          <div key={ticket.type} className="flex items-center mb-2">
            <span className="w-24">{ticket.type}</span>
            <Button
              handleClick={() => handleIncrement(ticket.type)}
              iconType={IconType.PLUS}
              variant={ButtonVariant.ICON}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              min={MIN_TICKET_COUNT}
              max={MAX_TICKET_COUNT}
              className="border bg-black-transparent text-white rounded-md px-2 py-1 w-20"
              value={ticketCounts[ticket.type] || ''}
              onChange={(e) =>
                handleTicketCountChange(ticket.type, e.target.value)
              }
            />
            <Button
              handleClick={() => handleDecrement(ticket.type)}
              iconType={IconType.MINUS}
              variant={ButtonVariant.ICON}
            />

            <span>cost: {ticket.price}</span>
          </div>
        ))}
        <div className="mt-4 font-bold">
          Total Cost: ${totalCost.toFixed(2)}
        </div>

        <div className="flex flex-wrap mt-4 gap-4">
          <Button label="Cancel" handleClick={closeModal} />
          <Button label="Confirm purchase" handleClick={closeModal} />
        </div>
      </Modal>
    </>
  );
};
