"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _db = _interopRequireDefault(require("../db"));
var _helper = _interopRequireDefault(require("./helper.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var dotenv = require("dotenv");
var path = require('path');
dotenv.config("../../../.env");
var User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  createUser: function createUser(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var hashPassword, removeDuplicate, createQuery, chosenProtocol, host, baseUrl, secretCode, values, mailOptions;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            console.log("Entering create function");
            if (!(!req.body.password || !req.body.username || !req.body.email)) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", res.status(400).send({
              message: "Alla fält är inte ifyllda"
            }));
          case 3:
            hashPassword = _helper["default"].hashPassword(req.body.password);
            removeDuplicate = "DELETE FROM anvandare\n      WHERE\n        status = 'pending'\n      AND\n        email = ?\n    ";
            createQuery = "INSERT INTO\n      anvandare (anvandarnamn, fornamn, efternamn, email, losenord, aktiveringskod)\n      VALUES (?, ?, ?, ?, ?, ?)\n      "; // const token = helper.generateToken(rows[0].anvandarnamn)
            // req.session.token = token
            // return res.status(201).send({ token })
            chosenProtocol = "https";
            host = req.get("host");
            if (host.includes("localhost")) {
              chosenProtocol = "http";
            }
            baseUrl = chosenProtocol + "://" + req.get("host");
            secretCode = _helper["default"].createVerificationToken(req.body.email);
            console.log("secret Code", secretCode);
            values = [req.body.username, req.body.firstname, req.body.lastname, req.body.email, hashPassword,
            //hashPassword
            secretCode];
            _context.prev = 13;
            _context.next = 16;
            return _db["default"].query(removeDuplicate, [values[3]]);
          case 16:
            _context.next = 21;
            break;
          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](13);
            console.log("Error in register db query", _context.t0);
          case 21:
            _context.prev = 21;
            console.log("Before create query in db");
            _context.next = 25;
            return _db["default"].query(createQuery, values);
          case 25:
            console.log("After create query");
            _context.prev = 26;
            mailOptions = {
              from: process.env.EMAIL_ADDRESS,
              to: req.body.email,
              subject: 'Confirm registration',
              text: "Anv\xE4nd f\xF6ljande l\xE4nk f\xF6r att aktivera ditt konto p\xE5 Radioskugga: ".concat(baseUrl, "/api/user/verification/verify-account/").concat(secretCode),
              html: "<p>Anv\xE4nd f\xF6ljande l\xE4nk f\xF6r att aktivera ditt konto p\xE5 Radioskugga: &nbsp;<strong></p><h3><a href=\"".concat(baseUrl, "/api/user/verification/verify-account/").concat(secretCode, "\" target=\"_blank\">Aktivera konto</a></strong></h3>")
            };
            console.log("Trying to send email");
            _context.next = 31;
            return _helper["default"].transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("Error sending mail", error);
              } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).send();
              }
            });
          case 31:
            console.log("Mail sent");
            _context.next = 37;
            break;
          case 34:
            _context.prev = 34;
            _context.t1 = _context["catch"](26);
            console.log("Error in register db query", _context.t1);
          case 37:
            _context.next = 48;
            break;
          case 39:
            _context.prev = 39;
            _context.t2 = _context["catch"](21);
            console.log("ERROR in register", _context.t2);
            console.log("error routine", _context.t2.code);
            console.log("Användarnamnet är upptaget");
            if (!(_context.t2.code === "ER_DUP_ENTRY")) {
              _context.next = 46;
              break;
            }
            return _context.abrupt("return", res.status(400).send({
              message: "Username taken"
            }));
          case 46:
            console.log("Something failed and I don't know what!");
            return _context.abrupt("return", res.status(400).send(_context.t2));
          case 48:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[13, 18], [21, 39], [26, 34]]);
    }))();
  },
  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  loginUser: function loginUser(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var createQuery, rows, errObj, _errObj, token;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            console.log("HEj fron loginUser, proc env", process.env.NODE_ENV);
            if (!(!req.body.username || !req.body.password)) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", res.status(400).send({
              message: "Alla fält är inte ifyllda"
            }));
          case 3:
            console.log("1We got to here!");
            createQuery = "SELECT * FROM user WHERE username = ?";
            _context2.prev = 5;
            console.log("2We got to here!");
            console.log("AND HERE");
            console.log("UNAME", req.body.username);
            console.log("PASSWORD", req.body.password);
            errObj = {};
            _context2.prev = 11;
            // rows = await db.query(text, [req.body.username])
            console.log("Query text", createQuery);
            _context2.next = 15;
            return _db["default"].query(createQuery, [req.body.username]);
          case 15:
            rows = _context2.sent;
            _context2.next = 21;
            break;
          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](11);
            console.log("Error i login query", _context2.t0);
          case 21:
            console.log("Queryn funkade här kommer rows", rows);
            if (rows[0]) {
              _context2.next = 30;
              break;
            }
            console.log("No match for user in database");
            errObj = {
              statusText: "No match for user in database"
            };
            res.status(400);
            res.send(errObj);
            return _context2.abrupt("return");
          case 30:
            if (!(rows[0].status === null)) {
              _context2.next = 34;
              break;
            }
            errObj = {
              statusText: "User not verified"
            };
            res.status(400).send(errObj);
            return _context2.abrupt("return");
          case 34:
            console.log("333We got to here!");
            console.log("Användarnamn stämmer");
            if (_helper["default"].comparePassword(rows[0].password, req.body.password)) {
              _context2.next = 41;
              break;
            }
            console.log("Compare pasword sket sig..");
            _errObj = {
              statusText: "Current password does not match"
            };
            res.status(400).send(_errObj);
            return _context2.abrupt("return");
          case 41:
            console.log("KOM enda hit");
            token = _helper["default"].generateToken(rows[0].username);
            console.log("Token", token);
            return _context2.abrupt("return", res.status(200).send({
              token: token
            }));
          case 47:
            _context2.prev = 47;
            _context2.t1 = _context2["catch"](5);
            console.log("ERROR", _context2.t1);
            return _context2.abrupt("return", res.status(400).send(_context2.t1));
          case 51:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[5, 47], [11, 18]]);
    }))();
  },
  /**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  deleteUser: function deleteUser(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var selectQuery, deleteQuery, _yield$db$query, rows;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            selectQuery = "SELECT * FROM anvandare WHERE anvandarnamn=?";
            deleteQuery = "DELETE FROM anvandare WHERE anvandarnamn=?";
            _context3.prev = 2;
            _context3.next = 5;
            return _db["default"].query(deleteQuery, [req.body.username /* req.user.username */]);
          case 5:
            _yield$db$query = _context3.sent;
            rows = _yield$db$query.rows;
            if (rows[0]) {
              _context3.next = 9;
              break;
            }
            return _context3.abrupt("return", res.status(404).send({
              message: "Användare hittades ej"
            }));
          case 9:
            _context3.next = 11;
            return _db["default"].query(deleteQuery, [req.body.username /* req.user.username */]);
          case 11:
            return _context3.abrupt("return", res.status(204).send());
          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", res.status(400).send(_context3.t0));
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[2, 14]]);
    }))();
  },
  updateUser: function updateUser(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var updateQuery;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            console.log("Running user update on backend");
            updateQuery = "UPDATE anvandare\n        SET (fornamn, efternamn, email) =\n        (?, ?, ?)\n        WHERE anvandarnamn=?";
            _context4.prev = 2;
            _context4.next = 5;
            return _db["default"].query(updateQuery, [req.body.firstname, req.body.lastname, req.body.email, req.user.username]);
          case 5:
            return _context4.abrupt("return", res.status(204).send());
          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            return _context4.abrupt("return", res.status(400).send(_context4.t0));
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[2, 8]]);
    }))();
  },
  setPassword: function setPassword(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var createQuery, rows, passwordQuery, hashPassword;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            console.log("Userid from changePassword:", req.body.userid), console.log("New password:", req.body.password);
            console.log("Code:", req.body.code);
            if (req.body.password) {
              _context5.next = 4;
              break;
            }
            return _context5.abrupt("return", res.status(400).send({
              message: "Lösenord ej angivet"
            }));
          case 4:
            console.log("222We got to here!");
            createQuery = "SELECT * FROM user WHERE id = ?";
            _context5.prev = 6;
            _context5.next = 9;
            return _db["default"].query(createQuery, [req.body.userid]);
          case 9:
            rows = _context5.sent;
            console.log("rows", rows);
            console.log("Queryn funkade");
            if (rows[0]) {
              _context5.next = 17;
              break;
            }
            console.log("No match");
            return _context5.abrupt("return", res.status(400).send({
              message: "Inloggningsuppgifterna du angav är felaktiga"
            }));
          case 17:
            if (!(rows[0].pass_code !== req.body.code)) {
              _context5.next = 22;
              break;
            }
            console.log("Fel kod", _typeof(rows[0].pass_code), _typeof(req.body.code));
            return _context5.abrupt("return", res.status(400).send({
              message: "Felaktig kod angiven"
            }));
          case 22:
            if (!(rows[0].password !== null)) {
              _context5.next = 25;
              break;
            }
            console.log("Password is not null");
            return _context5.abrupt("return", res.status(400).send({
              message: "Lösenord är redan sparat"
            }));
          case 25:
            console.log("333We got to here!");
            passwordQuery = "UPDATE user\n          SET password = ?\n          WHERE id = ?";
            hashPassword = _helper["default"].hashPassword(req.body.password);
            console.log("hashPassword", hashPassword);
            _context5.prev = 29;
            _context5.next = 32;
            return _db["default"].query(passwordQuery, [hashPassword, req.body.userid]);
          case 32:
            console.log("Lösenord bytt");
            return _context5.abrupt("return", res.status(204).send());
          case 36:
            _context5.prev = 36;
            _context5.t0 = _context5["catch"](29);
            print(_context5.t0);
            return _context5.abrupt("return", res.status(400).send(_context5.t0));
          case 40:
            _context5.next = 45;
            break;
          case 42:
            _context5.prev = 42;
            _context5.t1 = _context5["catch"](6);
            return _context5.abrupt("return", res.status(400).send(_context5.t1));
          case 45:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[6, 42], [29, 36]]);
    }))();
  },
  getUserData: function getUserData(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var createQuery, rows;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            createQuery = "SELECT anvandarnamn, fornamn, efternamn, email\n    FROM anvandare\n    WHERE anvandarnamn LIKE ?";
            _context6.prev = 1;
            _context6.next = 4;
            return _db["default"].query(createQuery, [req.user.username]);
          case 4:
            rows = _context6.sent;
            console.log("Username to use", req.user.username);
            console.log("USER data to send: ", rows);
            return _context6.abrupt("return", res.status(201).send(rows));
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](1);
            return _context6.abrupt("return", res.status(400).send(_context6.t0));
          case 13:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[1, 10]]);
    }))();
  },
  searchUsers: function searchUsers(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var createQuery, username, firstname, lastname, email, values, rows, rowsMod;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            console.log("Searching for users");
            createQuery = "SELECT anvandarnamn, hemligt FROM anvandare\n    WHERE\n      anvandarnamn LIKE\n        LOWER(?)\n   ";
            console.log("QUERY", req.query);
            console.log("QUERY FIRSTNAME", req.query.firstname);
            username = req.query.username || "";
            firstname = req.query.firstname || "";
            lastname = req.query.lastname || "";
            email = req.query.email || "";
            values = [username];
            console.log("VALUES", values);
            _context7.prev = 10;
            _context7.next = 13;
            return _db["default"].query(createQuery, values);
          case 13:
            rows = _context7.sent;
            console.log("Rows from searchUsers", rows);
            rowsMod = rows.filter(function (row) {
              return row.anvandarnamn !== req.user.username;
            });
            return _context7.abrupt("return", res.status(201).send(rowsMod));
          case 19:
            _context7.prev = 19;
            _context7.t0 = _context7["catch"](10);
            return _context7.abrupt("return", res.status(400).send(_context7.t0));
          case 22:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[10, 19]]);
    }))();
  },
  // #route:  GET /verification/verify-account
  // #desc:   Verify user's email address
  // #access: Public
  verifyAccount: function verifyAccount(req, res) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var decoded, updateUser, values, rows;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            console.log("Verifying account");
            _context8.prev = 1;
            _context8.next = 4;
            return _jsonwebtoken["default"].verify(req.params.secretCode, process.env.SECRET);
          case 4:
            decoded = _context8.sent;
            _context8.next = 11;
            break;
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](1);
            console.log("Error on /api/user/verification/verify-account: jwt verification ", _context8.t0);
            return _context8.abrupt("return", res.sendFile("verification-jwt-fail.html", {
              root: path.join(__dirname, '../../../public')
            }));
          case 11:
            updateUser = "\n      UPDATE anvandare\n      SET \n        aktiveringskod = null,\n        status = 'member'\n      WHERE\n        aktiveringskod = ?\n      AND\n        email = ?\n    ";
            values = [req.params.secretCode, decoded.email];
            _context8.prev = 13;
            _context8.next = 16;
            return _db["default"].query(updateUser, values);
          case 16:
            rows = _context8.sent;
            console.log("Rows from updateUser", rows);
            _context8.next = 24;
            break;
          case 20:
            _context8.prev = 20;
            _context8.t1 = _context8["catch"](13);
            console.log("Error on /api/auth/verification/verify-account: ", _context8.t1);
            return _context8.abrupt("return", res.sendFile("verification-db-fail.html", {
              root: path.join(__dirname, '../../../public')
            }));
          case 24:
            console.log("Verification success");
            res.sendFile("verification-success.html", {
              root: path.join(__dirname, '../../../public')
            });
          case 26:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[1, 7], [13, 20]]);
    }))();
  }
};
var _default = User;
exports["default"] = _default;