'use strict';

var request = require('supertest')
  , express = require('express')
  , assert = require('assert')
  , async = require('async')
  , client = require('../test/client')
  , app = require('../app')
  , protocol = require('../test/protocol')
  , gateway = protocol.gateway
  , common = protocol.common
  , room = protocol.room;


describe('API 확인', function() {

  // VERSION 응답확인
  it('VERSION 확인', function (done) {
    async.series([
      function (callback) {
        client.version(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.VERSION);
          callback(err, res);
        }, 1111, '0.1-test', common.PlatformType.PLATFORM_ANDROID);
      }
    ], done);
  })

  // LOGIN 응답확인
  it('LOGIN 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      }, 
      function (callback) {
        client.login(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.LOGIN);
          callback(err, res);
        }, 2000);
      }
    ], done);
  })

  // INFO 응답확인
  it('INFO 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      }, 
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.info(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.INFO);
          callback(err, res);
        });
      }
    ], done);
  })

  // PROPERTIES 응답확인
  it('PROPERTIES 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      }, 
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.info(callback);
      },
      function (callback) {
        client.properties(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.PROPERTIES);
          callback(err, res);
        });
      }
    ], done);
  })

  // BADGES 응답확인
  it('BADGES 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      }, 
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.info(callback);
      },
      function (callback) {
        client.badges(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.BADGES);
          callback(err, res);
        });
      }
    ], done);
  })

  // NICKNAME 응답확인
  it('NICKNAME 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      }, 
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.info(callback);
      },
      function (callback) {
        client.nickname(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.NICKNAME);
          callback(err, res);
        }, 'Player 2000');
      }
    ], done);
  })

  // MAKE_HERO 응답확인
  it('MAKE_HERO 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      },
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.makeHero(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.MAKE_HERO);
          callback(err, res);
        }, common.JobType.JOB_SWORD);
      }
    ], done);
  })

  // SELECT_HERO 응답확인
  it('SELECT_HERO 확인', function (done) {
    var heroes = [];

    async.series([
      function (callback) {
        client.version(callback);
      },
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.heroes(function (err, res) {
          var response = protocol.decode(res.text);
          heroes = response.heroes;
          callback(err, res);
        });
      },
      function (callback) {
        client.selectHero(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.SELECT_HERO);
          callback(err, res);
        }, common.JobType.JOB_SWORD);
      }
    ], done);
  })

  // HEROES 응답확인
  it('HEROES 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      }, 
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.heroes(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.HEROES);
          callback(err, res);
        });
      }
    ], done);
  })

  // COSTUMES 응답확인
  it('COSTUMES 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      }, 
      function (callback) {
        client.login(callback);
      },
      function (callback) {
        client.costumes(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.COSTUMES);
          callback(err, res);
        });
      }
    ], done);
  })

  // COSTUMES_TO_MAKE 응답확인
  it('COSTUMES_TO_MAKE 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      },
      function (callback) {
        client.login(callback);
      }, 
      function (callback) {
        client.costumesToMake(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.COSTUMES_TO_MAKE);
          callback(err, res);
        });
      }
    ], done);
  })

  // COSTUMES_TO_REINFORCE 확인
  it('COSTUMES_TO_REINFORCE 확인', function (done) {
    async.series([
      function (callback) {
        client.version(callback);
      },
      function (callback) {
        client.login(callback);
      }, 
      function (callback) {
        client.costumesToReinforce(function (err, res) {
          var response = protocol.decode(res.text);
          assert.equal(response.type, gateway.MessageType.COSTUMES_TO_REINFORCE);
          callback(err, res);
        });
      }
    ], done);
  })

  // SELECT_COSTUME 응답확인
  it('SELECT_COSTUME 확인', function (done) {
    request(app).post('/api')
      .send(protocol.selectCostume(11000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.SELECT_COSTUME);
        done();
      });
  })
  
  // MAKE_COSTUME 응답확인
  it('MAKE_COSTUME 확인', function (done) {
    request(app).post('/api')
      .send(protocol.makeCostume(11000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.MAKE_COSTUME);
        done();
      });
  })

  // BUY_COSTUME 응답확인
  it('BUY_COSTUME 확인', function (done) {
    request(app).post('/api')
      .send(protocol.buyCostume(11000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.BUY_COSTUME);
        done();
      });
  })

  it('REINFORCE_COSTUME 확인', function (done) {
    request(app).post('/api')
      .send(protocol.reinforceCostume(11000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.REINFORCE_COSTUME);
        done();
      });
  })

  it('DUNGEONS 확인', function (done) {
    request(app).post('/api')
      .send(protocol.dungeons())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.DUNGEONS);
        done();
      });
  })

  it('EPIC_DUNGEONS 확인', function (done) {
    request(app).post('/api')
      .send(protocol.epicDungeons())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.EPIC_DUNGEONS);
        done();
      });
  })

  it('STAGES 확인', function (done) {
    request(app).post('/api')
      .send(protocol.stages(1000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.STAGES);
        done();
      });
  })

  it('UNLOCK_STAGE 확인', function (done) {
    request(app).post('/api')
      .send(protocol.unlockStage(1000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.UNLOCK_STAGE);
        done();
      });
  })

  it('RESET_STAGE 확인', function (done) {
    request(app).post('/api')
      .send(protocol.resetStage(1000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.RESET_STAGE);
        done();
      });
  })

  it('QUERY_STAGE 확인', function (done) {
    request(app).post('/api')
      .send(protocol.queryStage(1000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.QUERY_STAGE);
        done();
      });
  })

  it('HEART 확인', function (done) {
    request(app).post('/api')
      .send(protocol.heart())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.HEART);
        done();
      });
  })

  it('GIFTS 확인', function (done) {
    request(app).post('/api')
      .send(protocol.gifts())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.GIFTS);
        done();
      });
  })

  it('TAKE_GIFT 확인', function (done) {
    request(app).post('/api')
      .send(protocol.takeGift(100))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.TAKE_GIFT);
        done();
      });
  })

  it('TUTORIAL 확인', function (done) {
    request(app).post('/api')
      .send(protocol.tutorial(1))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.TUTORIAL);
        done();
      });
  })

  it('QUERY_PROMOTION 확인', function (done) {
    request(app).post('/api')
      .send(protocol.queryPromotion(common.PlatformType.PLATFORM_ANDROID))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.QUERY_PROMOTION);
        done();
      });
  })

  it('INVENTORY 확인', function (done) {
    request(app).post('/api')
      .send(protocol.inventory())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.INVENTORY);
        done();
      });
  })

  it('EXPAND_INVENTORY 확인', function (done) {
    request(app).post('/api')
      .send(protocol.expandInventory(1))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.EXPAND_INVENTORY);
        done();
      });
  })

  it('DROP_ITEM 확인', function (done) {
    request(app).post('/api')
      .send(protocol.dropItem(10000, 1))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.DROP_ITEM);
        done();
      });
  })

  it('PUT_ON 확인', function (done) {
    request(app).post('/api')
      .send(protocol.putOn(100000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.PUT_ON);
        done();
      });
  })

  it('TAKE_OFF 확인', function (done) {
    request(app).post('/api')
      .send(protocol.takeOff(1))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.TAKE_OFF);
        done();
      });
  })

  it('REINFORCE_ITEM 확인', function (done) {
    request(app).post('/api')
      .send(protocol.reinforceItem(1, true))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.REINFORCE_ITEM);
        done();
      });
  })

  it('FIX_ITEM 확인', function (done) {
    request(app).post('/api')
      .send(protocol.fixItem(10000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.FIX_ITEM);
        done();
      });
  })

  it('MAKE_ITEM 확인', function (done) {
    request(app).post('/api')
      .send(protocol.makeItem(1000, 1))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.MAKE_ITEM);
        done();
      });
  })

  it('LOTTERYS 확인', function (done) {
    request(app).post('/api')
      .send(protocol.lotterys())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.LOTTERYS);
        done();
      });
  })

  it('TAKE_LOTTERY 확인', function (done) {
    request(app).post('/api')
      .send(protocol.takeLottery(1, 1))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.TAKE_LOTTERY);
        done();
      });
  })

  it('SKILLS 확인', function (done) {
    request(app).post('/api')
      .send(protocol.skills())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.SKILLS);
        done();
      });
  })

  it('SKILL_BUTTON 확인', function (done) {
    request(app).post('/api')
      .send(protocol.skillButton(1111, 10002, 0))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.SKILL_BUTTON);
        done();
      });
  })

  it('REINFORCE_SKILL 확인', function (done) {
    request(app).post('/api')
      .send(protocol.reinforceSkill(1000))
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.REINFORCE_SKILL);
        done();
      });
  })

  it('SKILL_AUTO_ASSIGN 확인', function (done) {
    request(app).post('/api')
      .send(protocol.skillAutoAssign())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.SKILL_AUTO_ASSIGN);
        done();
      });
  })

  it('RESET_SKILL 확인', function (done) {
    request(app).post('/api')
      .send(protocol.resetSkill())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.RESET_SKILL);
        done();
      });
  })

  it('BUDDIES 확인', function (done) {
    request(app).post('/api')
      .send(protocol.buddies())
      .expect(200)
      .end(function (err, res) {
        var response = protocol.decode(res.text);
        assert.equal(response.type, gateway.MessageType.BUDDIES);
        done();
      });
  })

})
