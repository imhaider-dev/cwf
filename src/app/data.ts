export const data = {
    "id": 1,
    "name": "ACME SM 1",
    "states": {
      "1": {
        "id": 1,
        "name": "Pending Manager Approval"
      },
      "2": {
        "id": 2,
        "name": "Pending Admin Approval"
      },
      "3": {
        "id": 3,
        "name": "International Compliance"
      },
     
    },
    "transitions": {
      "1": {
        "id": 1,
        "name": "Approve",
        "state_from": {
          "id": 1
        },
        "state_to": {
          "id": 2
        },
        "functions": {
          "1": {
            "id": 1,
            "name": "Send Notifications",
            "data": null,
            "type": "LAMBDA",
            "condition": null,
            "exec_type": "POST",
            "exec_async": 1
          },
          "2": {
            "id": 2,
            "name": "Update SalesForce Record",
            "data": null,
            "type": "LAMBDA",
            "condition": null,
            "exec_type": "POST",
            "exec_async": 1
          }
        },
        "paths": {
          "1": {
            "id": 1,
            "groups_csv": "1,2,3",
            "groups": [
              {
                "group": {
                  "id": 1,
                  "name": "SSA"
                }
              },
              {
                "group": {
                  "id": 2,
                  "name": "CSA"
                }
              },
              {
                "group": {
                  "id": 3,
                  "name": "West Admins"
                }
              }
            ],
            "condition": null,
            "functions": {}
          },
          "2": {
            "id": 2,
            "groups_csv": "4",
            "groups": [
              {
                "group": {
                  "id": 4,
                  "name": "East Admins"
                }
              }
            ],
            "condition": null,
            "functions": {}
          }
        }
      },
      "2": {
        "id": 2,
        "name": "Deny",
        "state_from": {
          "id": 2
        },
        "state_to": {
          "id": 3
        },
        "functions": {
          "3": {
            "id": 3,
            "name": "Send Notifications",
            "data": null,
            "type": "LAMBDA",
            "condition": null,
            "exec_type": "POST",
            "exec_async": 1
          }
        },
        "paths": {
          "3": {
            "id": 3,
            "groups_csv": "1,2,3",
            "groups": [
              {
                "group": {
                  "id": 1,
                  "name": "SSA"
                }
              },
              {
                "group": {
                  "id": 2,
                  "name": "CSA"
                }
              },
              {
                "group": {
                  "id": 3,
                  "name": "West Admins"
                }
              }
            ],
            "condition": null,
            "functions": {}
          }
        }
      },
      // "3": {
      //   "id": 3,
      //   "name": "Transition 3",
      //   "state_from": {
      //     "id": 3
      //   },
      //   "state_to": {
      //     "id": 4
      //   },
      //   "functions": {},
      //   "paths": {}
      // }
    }
  }
  