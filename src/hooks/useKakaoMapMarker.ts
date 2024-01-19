// import { useCallback, useState } from 'react';
import { create } from 'zustand';

export type Position = {
  position: { lat: number; lng: number };
  setPosition: (position: { lat: number; lng: number }) => void;
};

export type Address = {
  address: string;
  setAddress: (address: string) => void;
};

const usePosition = create<Position>((set) => ({
  position: { lat: 0, lng: 0 },
  setPosition: (position) => set(() => ({ position }))
}));

const useAddress = create<Address>((set) => ({
  address: '',
  setAddress: (address) => set(() => ({ address }))
}));

export { usePosition, useAddress };
