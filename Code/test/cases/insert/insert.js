describe('Test insert', function () {
    it('wrong table test', function (done) {
        Con.insert({
            Into: 'Customer'
        }).
        catch(function (err) {
            console.log(err);
            var error = {
                _type: "not_array",
                _message: "Supplied value is not an array"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        })
    });

    it('insert customers using promise', function (done) {
        $.getJSON("static/Customers.json", function (results) {
            Con.insert({
                Into: 'Customers',
                Values: results
            }).then(function (results) {
                expect(results).to.be.an('number').to.equal(93);
                done();
            }).
            then(function (err) {
                done(err);
            })
        });
    });

    it('insert Orders using without promise', function (done) {
        $.getJSON("static/Orders.json", function (results) {
            Con.insert({
                Into: 'Orders',
                Values: results,
                OnSuccess: function (results) {
                    expect(results).to.be.an('number').to.equal(196);
                    done();
                },
                OnError: function (err) {
                    done(err);
                }
            });
        });
    });

    it('insert Shippers using without promise', function (done) {
        $.getJSON("static/Shippers.json", function (results) {
            Con.insert({
                Into: 'Shippers',
                Values: results,
                OnSuccess: function (results) {
                    expect(results).to.be.an('number').to.equal(3);
                    done();
                },
                OnError: function (err) {
                    done(err);
                }
            });
        });
    });

    it('insert products - using Skip Data', function (done) {
        $.getJSON("static/Products.json", function (results) {
            Con.insert({
                Into: 'Products',
                Values: results,
                SkipDataCheck: true,
                OnSuccess: function (results) {
                    expect(results).to.be.an('number').to.equal(77);
                    done();
                },
                OnError: function (err) {
                    done(err);
                }
            });
        });
    });

    it('insert suppliers - using return Data', function (done) {
        $.getJSON("static/Suppliers.json", function (results) {
            Con.insert({
                Into: 'Suppliers',
                Values: results,
                Return: true,
                OnSuccess: function (results) {
                    expect(results).to.be.an('array').length(29);
                    done();
                },
                OnError: function (err) {
                    done(err);
                }
            });
        });
    });

    it('insert without values Option', function (done) {
        Con.insert({
            Into: 'Customers',
            OnSuccess: function (results) {
                expect(results).to.be.an('number').to.equal(196);
                done();
            },
            OnError: function (err) {
                console.log(err);
                var error = {
                    _type: "not_array",
                    _message: "Supplied value is not an array"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            }
        });
    });

    it('not null test', function (done) {
        Con.insert({
            Into: 'Customers',
            Values: [{}],
            OnSuccess: function (results) {
                expect(results).to.be.an('number').to.equal(196);
                done();
            },
            OnError: function (err) {
                console.log(err);
                var error = {
                    "_message": "Null value is not allowed for column 'CustomerName'",
                    "_type": "null_value"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            }
        });
    });

    it('not null test for last column', function (done) {
        var value = {
            ShipperName: 'dsfgb'
        }
        Con.insert({
            Into: 'Shippers',
            Values: [value],
            OnSuccess: function (results) {
                expect(results).to.be.an('number').to.equal(3);
                done();
            },
            OnError: function (err) {
                console.log(err);
                var error = {
                    "_message": "Null value is not allowed for column 'Phone'",
                    "_type": "null_value"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            }
        });
    });

    it('wrong data type test - string', function (done) {
        var value = {
            ShipperName: 'dsfgb',
            Phone: 91234
        }
        Con.insert({
            Into: 'Shippers',
            Values: [value],
            OnSuccess: function (results) {
                expect(results).to.be.an('number').to.equal(3);
                done();
            },
            OnError: function (err) {
                var error = {
                    "_message": "Supplied value for column 'Phone' does not have valid type",
                    "_type": "bad_data_type"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            }
        });
    });

    it('wrong data type test - number', function (done) {
        var value = {
            ProductName: "dfb",
            SupplierID: 5,
            CategoryID: 10,
            Price: "1123",
            Unit: 12333
        }
        Con.insert({
            Into: 'Products',
            Values: [value],
            OnSuccess: function (results) {
                expect(results).to.be.an('number').to.equal(3);
                done();
            },
            OnError: function (err) {
                var error = {
                    "_message": "Supplied value for column 'Unit' does not have valid type",
                    "_type": "bad_data_type"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            }
        });
    });

    it('undefined column insert', function (done) {
        var value = {
            ShipperName: 'dsfgb',
            Phone: '91234',
            Address: 'ewrtgb'
        }
        Con.insert({
            Into: 'Shippers',
            Values: [value],
            Return: true,
            OnSuccess: function (results) {
                var returned_value = results[0];
                value['ShipperID'] = returned_value.ShipperID;
                expect(returned_value).to.be.an('object').eql(value);
                done();
            },
            OnError: function (err) {
                done(err);
            }
        });
    });

    it('EnableSearch column test', function (done) {
        var value = {
            CustomerName: "dfb",
            ContactName: "Anders",
            Address: 'ewrgt',
            City: "1123",
            PostalCode: "frfd",
            Country: 'fesgt',
            Email: 1234
        }
        Con.insert({
            Into: 'Customers',
            Values: [value],
            OnSuccess: function (results) {
                expect(results).to.be.an('number').to.equal(3);
                done();
            },
            OnError: function (err) {
                var error = {
                    "_message": "Supplied value for column 'Email' does not have valid type",
                    "_type": "bad_data_type"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            }
        });
    });
});