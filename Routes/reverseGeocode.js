// const { getORSRoute } = require("../Routes/direction");
// const router = require("./auth");

// // Middleware to parse JSON requests
// const compareModesController = async (req, res) => {
//   console.log("Received request to compare modes:", req.body);
//   const { start, end } = req.body;

//   if (!start || !end) {
//     return res.status(400).json({ error: "Start and end coordinates required" });
//   }

//   try {
//     // Get route data from ORS
//     const driving = await getORSRoute(start, end, 'driving-car');
//     const cycling = await getORSRoute(start, end, 'cycling-regular');
//     const metroEstimate = {
//       distanceKm: driving.distanceKm * 0.9,  // assuming metro is more direct
//       durationMin: driving.durationMin * 0.6 // metro is faster
//     };

//     const modes = [
//       {
//         name: "Bike",
//         time: `${cycling.durationMin.toFixed(0)} mins`,
//         cost: `₹${(cycling.distanceKm * 2).toFixed(0)}`,
//         emissions: `${(cycling.distanceKm * 0.015).toFixed(2)} kg`
//       },
//       {
//         name: "Metro",
//         time: `${metroEstimate.durationMin.toFixed(0)} mins`,
//         cost: `₹${(metroEstimate.distanceKm * 1).toFixed(0)}`,
//         emissions: `${(metroEstimate.distanceKm * 0.008).toFixed(2)} kg`
//       },
//       {
//         name: "Cab",
//         time: `${driving.distanceKm / 40 * 60} mins`,
//         cost: `₹${(driving.distanceKm * 10).toFixed(0)}`,
//         emissions: `${(driving.distanceKm * 0.12).toFixed(2)} kg`
//       }
//     ];
//     return res.json({
//       from: start,
//       to: end,
//       distance: `${driving.distanceKm.toFixed(1)} km`,
//       modes
//     });
//   } catch (err) {
//     return res.status(500).json({ error: "Something went wrong in route processing." });
//   }
// };
// router.post('/compare-modes', compareModesController);
// module.exports = router;





const { getORSRoute } = require("../Routes/direction");
const router = require("./auth");

// Middleware to parse JSON requests
const compareModesController = async (req, res) => {
  console.log("Received request to compare modes:", req.body);
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ error: "Start and end coordinates required" });
  }

  try {
    // Get route data from ORS
    const driving = await getORSRoute(start, end, 'driving-car');
    const cycling = await getORSRoute(start, end, 'cycling-regular');
    const busEstimate = {
      distanceKm: driving.distanceKm,  
      durationMin: driving.durationMin * 1.2 // bus is slower
    };

    const modes = [
      {
        name: "Cycle",
        time: `${cycling.durationMin.toFixed(0) * 1.3} mins`,
        cost: `₹ 0`,
        emissions: `0 kg`
      },
      {
        name: "Bus",
        time: `${busEstimate.durationMin.toFixed(0)} mins`,
        cost: `₹${(busEstimate.distanceKm * 2.5).toFixed(0)}`,
        emissions: `${(busEstimate.distanceKm * 0.008).toFixed(2)} kg`
      },
      {
        name: "Cab",
        time: `${(driving.distanceKm / 40 * 60).toFixed(1)} mins`,
        cost: `₹${(driving.distanceKm * 6).toFixed(0)}`,
        emissions: `${(driving.distanceKm * 0.12).toFixed(2)} kg`
      }
    ];
    return res.json({
      from: start,
      to: end,
      distance: `${driving.distanceKm.toFixed(1)} km`,
      modes
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong in route processing." });
  }
};
router.post('/compare-modes', compareModesController);
module.exports = router;






// const { getORSRoute } = require("../Routes/direction");
// const router = require("./auth");

// // Middleware to parse JSON requests
// const compareModesController = async (req, res) => {
//   console.log("Received request to compare modes:", req.body);
//   const { start, end } = req.body;

//   if (!start || !end) {
//     return res.status(400).json({ error: "Start and end coordinates required" });
//   }

//   try {
//     // Get route data from ORS
//     const driving = await getORSRoute(start, end, 'driving-car');
//     const cycling = await getORSRoute(start, end, 'cycling-regular');

//     // Estimate Bus mode (slower than car, cheaper, less emissions)
//     const busEstimate = {
//       distanceKm: driving.distanceKm, // same route
//       durationMin: driving.durationMin * 1.2, // 20% slower
//     };

//     const modes = [
//       {
//         name: "Bike",
//         time: ${cycling.durationMin.toFixed(0)} mins,
//         cost: ₹${(cycling.distanceKm * 2).toFixed(0)},
//         emissions: ${(cycling.distanceKm * 0.015).toFixed(2)} kg
//       },
//       {
//         name: "Bus",
//         time: ${busEstimate.durationMin.toFixed(0)} mins,
//         cost: ₹${(busEstimate.distanceKm * 5).toFixed(0)},
//         emissions: ${(busEstimate.distanceKm * 0.09).toFixed(2)} kg
//       },
//       {
//         name: "Cab",
//         time: ${(driving.distanceKm / 40 * 60).toFixed(0)} mins,
//         cost: ₹${(driving.distanceKm * 10).toFixed(0)},
//         emissions: ${(driving.distanceKm * 0.12).toFixed(2)} kg
//       }
//     ];

//     return res.json({
//       from: start,
//       to: end,
//       distance: ${driving.distanceKm.toFixed(1)} km,
//       modes
//     });

//   } catch (err) {
//     return res.status(500).json({ error: "Something went wrong in route processing." });
//   }
// };

// router.post('/compare-modes', compareModesController);
// module.exports = router;

