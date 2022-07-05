# MongoDB

```bash
db.goldReports.aggregate( [

   {
      $match: { goldType: "pnj", reportTime: { $gte: 1656608400000, $lt: 1656694800000} }
   },

   {
      $group: { _id: "$goldType", count: { $sum: 1 } }
   }
] )

db.goldReports.find( { goldType: "pnj", reportTime: { $gte: 1656608400000, $lt: 1656694800000} })
```

1.Statistic by hour: 00:00:00 Day A -> 00:00:00 Day A + 1
Start: Tue, 01 Jul 2022 00:00:00 GMT+07:00
1656608400000
End: Tue, 02 Jul 2022 00:00:00 GMT+07:00
1656694800000
