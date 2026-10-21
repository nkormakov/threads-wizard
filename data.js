// Add or edit rows here; the table is generated from these lists.
// "common" sizes are shown by default, "rare" ones only after pressing "Show rare sizes".

// ISO metric: [nominal diameter (mm), pitch (mm), series, frequency]
const METRIC = [
  [1, 0.25, "coarse", "rare"], [1.2, 0.25, "coarse", "rare"], [1.4, 0.3, "coarse", "rare"],
  [1.6, 0.35, "coarse", "rare"], [2, 0.4, "coarse", "common"], [2.5, 0.45, "coarse", "common"],
  [3, 0.5, "coarse", "common"], [3.5, 0.6, "coarse", "rare"], [4, 0.7, "coarse", "common"],
  [5, 0.8, "coarse", "common"], [6, 1, "coarse", "common"], [8, 1.25, "coarse", "common"],
  [10, 1.5, "coarse", "common"], [12, 1.75, "coarse", "common"], [14, 2, "coarse", "common"],
  [16, 2, "coarse", "common"], [18, 2.5, "coarse", "common"], [20, 2.5, "coarse", "common"],
  [22, 2.5, "coarse", "common"], [24, 3, "coarse", "common"], [27, 3, "coarse", "common"],
  [30, 3.5, "coarse", "common"], [33, 3.5, "coarse", "rare"], [36, 4, "coarse", "common"],
  [39, 4, "coarse", "rare"], [42, 4.5, "coarse", "rare"], [45, 4.5, "coarse", "rare"],
  [48, 5, "coarse", "rare"], [52, 5, "coarse", "rare"], [56, 5.5, "coarse", "rare"],
  [60, 5.5, "coarse", "rare"], [64, 6, "coarse", "rare"],

  [3, 0.35, "fine", "rare"], [4, 0.5, "fine", "rare"], [5, 0.5, "fine", "rare"],
  [6, 0.75, "fine", "rare"], [8, 1, "fine", "common"], [10, 1, "fine", "common"],
  [10, 1.25, "fine", "common"], [12, 1.25, "fine", "common"], [12, 1.5, "fine", "common"],
  [14, 1.5, "fine", "common"], [16, 1.5, "fine", "common"], [18, 1.5, "fine", "common"],
  [20, 1.5, "fine", "common"], [20, 2, "fine", "rare"], [22, 1.5, "fine", "common"],
  [24, 1.5, "fine", "common"], [24, 2, "fine", "common"], [27, 2, "fine", "rare"],
  [30, 1.5, "fine", "rare"], [30, 2, "fine", "rare"], [33, 2, "fine", "rare"],
  [36, 2, "fine", "rare"], [36, 3, "fine", "rare"], [42, 3, "fine", "rare"],
  [48, 3, "fine", "rare"], [56, 4, "fine", "rare"], [64, 4, "fine", "rare"]
];

// Unified inch (ASME B1.1): [size, major diameter (in), threads per inch, series, frequency]
// Series "coarse" = UNC, "fine" = UNF.
const INCH = [
  ["#1", 0.073, 64, "coarse", "rare"], ["#2", 0.086, 56, "coarse", "rare"],
  ["#3", 0.099, 48, "coarse", "rare"], ["#4", 0.112, 40, "coarse", "common"],
  ["#5", 0.125, 40, "coarse", "rare"], ["#6", 0.138, 32, "coarse", "common"],
  ["#8", 0.164, 32, "coarse", "common"], ["#10", 0.19, 24, "coarse", "common"],
  ["#12", 0.216, 24, "coarse", "rare"], ["1/4", 0.25, 20, "coarse", "common"],
  ["5/16", 0.3125, 18, "coarse", "common"], ["3/8", 0.375, 16, "coarse", "common"],
  ["7/16", 0.4375, 14, "coarse", "common"], ["1/2", 0.5, 13, "coarse", "common"],
  ["9/16", 0.5625, 12, "coarse", "common"], ["5/8", 0.625, 11, "coarse", "common"],
  ["3/4", 0.75, 10, "coarse", "common"], ["7/8", 0.875, 9, "coarse", "common"],
  ["1", 1, 8, "coarse", "common"], ["1-1/8", 1.125, 7, "coarse", "rare"],
  ["1-1/4", 1.25, 7, "coarse", "rare"], ["1-3/8", 1.375, 6, "coarse", "rare"],
  ["1-1/2", 1.5, 6, "coarse", "rare"], ["1-3/4", 1.75, 5, "coarse", "rare"],
  ["2", 2, 4.5, "coarse", "rare"],

  ["#0", 0.06, 80, "fine", "rare"], ["#1", 0.073, 72, "fine", "rare"],
  ["#2", 0.086, 64, "fine", "rare"], ["#3", 0.099, 56, "fine", "rare"],
  ["#4", 0.112, 48, "fine", "rare"], ["#5", 0.125, 44, "fine", "rare"],
  ["#6", 0.138, 40, "fine", "rare"], ["#8", 0.164, 36, "fine", "rare"],
  ["#10", 0.19, 32, "fine", "common"], ["#12", 0.216, 28, "fine", "rare"],
  ["1/4", 0.25, 28, "fine", "common"], ["5/16", 0.3125, 24, "fine", "common"],
  ["3/8", 0.375, 24, "fine", "common"], ["7/16", 0.4375, 20, "fine", "common"],
  ["1/2", 0.5, 20, "fine", "common"], ["9/16", 0.5625, 18, "fine", "rare"],
  ["5/8", 0.625, 18, "fine", "common"], ["3/4", 0.75, 16, "fine", "common"],
  ["7/8", 0.875, 14, "fine", "rare"], ["1", 1, 12, "fine", "rare"],
  ["1-1/8", 1.125, 12, "fine", "rare"], ["1-1/4", 1.25, 12, "fine", "rare"],
  ["1-3/8", 1.375, 12, "fine", "rare"], ["1-1/2", 1.5, 12, "fine", "rare"]
];
