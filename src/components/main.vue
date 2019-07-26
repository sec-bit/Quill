<template>
  <div
    v-if="isOnline"
    class="online_warning"
  >To protect your crypto currency asset, please turn off the network before using the tool.</div>
  <div class="quill_content" v-else>
    <el-steps :active="steps" align-center>
      <el-step title="Import Private Key" icon="el-icon-upload"></el-step>
      <el-step title="Sign For Message" icon="el-icon-edit"></el-step>
      <el-step title="Export Signature" icon="el-icon-download"></el-step>
    </el-steps>
    <br />
    <div class="operation_content">
      <div v-if="steps === 0">
        <div class="sign_content">
          <h2>Step 1: Import Private Key</h2>
          <el-form :label-position="labelPosition" label-width="140px">
            <el-form-item label="Currency" prop="currency">
              <el-select
                @change="currencyChange()"
                v-model="data.currency"
                placeholder="Please select a currency"
              >
                <el-option
                  v-for="item in currencies"
                  :key="item.key"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="import Type" prop="importType">
              <el-radio-group v-model="data.importType" @change="importTypeChange()">
                <el-radio label="privateKey" value="privateKey"></el-radio>
                <el-radio label="mnemonic" value="mnemonic"></el-radio>
              </el-radio-group>
            </el-form-item>
            <hr />
            <div v-if="data.importType==='mnemonic'">
              <el-form-item label="BIP39 Mnemonic">
                <el-input v-model="data.mnemonic" type="textarea" @change="mnemonicChanged()"></el-input>
              </el-form-item>
              <el-form-item label="BIP39 Passphrase">
                <el-input v-model="data.passphrase " type="textarea" @change="mnemonicChanged()"></el-input>
              </el-form-item>
              <div v-if="data.rootkey!==''">
                <el-form-item label="Root Key">
                  <el-input v-model="data.rootkey" :disabled="true" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="Derivation Path">
                  {{ data.derivationPath }}/{{ data.derivation.index }}
                  <el-button
                    icon="el-icon-edit"
                    size="mini"
                    circle
                    @click="dialogVisible = true"
                    type="primary"
                    plain
                  ></el-button>
                </el-form-item>
                <el-form-item label="Address Count" prop="count">
                  <el-input
                    v-model="data.derivation.count"
                    type="number"
                    @change="derivationChange()"
                  ></el-input>
                </el-form-item>
                <hr />
                <el-form-item label="Private Key" prop="privateKey">
                  <el-select
                    v-model="data.privateKey"
                    placeholder="Please select a private key"
                    @change="privakeyChange()"
                  >
                    <el-option
                      v-for="item in data.privkeies"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div v-if="data.importType==='privateKey'">
              <el-form-item label="Private Key" prop="privateKey">
                <el-input v-model="data.privateKey" @change="privakeyChange()"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="Public Key" prop="publicKey" v-if="data.publicKey!==''">
              <el-input v-model="data.publicKey" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Address" prop="address" v-if="data.address!==''">
              <el-input v-model="data.address" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item
              label="Address(Bech32)"
              prop="bech32Address"
              v-if="data.bech32Address!==''"
            >
              <el-input v-model="data.bech32Address" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item
              label="Address(BitcoinCash)"
              prop="bchAddress"
              v-if="data.bchAddress!==''"
            >
              <el-input v-model="data.bchAddress" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div class="right_arrow">
            <el-button @click="gotoStep2()" v-if="data.address !== ''">
              next
              <i class="el-icon-d-arrow-right el-icon--right"></i>
            </el-button>
          </div>
        </div>
      </div>
      <div v-else-if="steps === 1">
        <div>
          <div class="left_arrow">
            <el-button icon="el-icon-d-arrow-left" @click="gobackStep1()">prev</el-button>
          </div>
        </div>
        <div class="sign_content">
          <h2>Step 2: Sign For Message</h2>
          <el-form :label-position="labelPosition" label-width="140px">
            <el-form-item label="Crypto Currency">
              <el-input v-model="data.currency" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Private Key" prop="privateKey">
              <el-input v-model="data.privateKey" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Public Key" prop="publicKey">
              <el-input v-model="data.publicKey" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Address" prop="address">
              <el-input v-model="data.address" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item
              label="Address(Bech32)"
              prop="bech32Address"
              v-if="data.bech32Address!==''"
            >
              <el-input v-model="data.bech32Address" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item
              label="Address(BitcoinCash)"
              prop="bchAddress"
              v-if="data.bchAddress!==''"
            >
              <el-input v-model="data.bchAddress" :disabled="true"></el-input>
            </el-form-item>
            <hr />
            <el-form-item label="Message" prop="message">
              <el-input type="textarea" v-model="data.message" @change="messageChange()"></el-input>
            </el-form-item>
            <el-form-item label="Signature" prop="signature">
              <el-input type="textarea" v-model="data.signature"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div class="right_arrow">
            <el-button @click="gotoStep3()" v-if="data.signature !== ''">
              next
              <i class="el-icon-d-arrow-right el-icon--right"></i>
            </el-button>
          </div>
        </div>
      </div>
      <div v-else-if="steps === 2">
        <div>
          <div class="left_arrow">
            <el-button icon="el-icon-d-arrow-left" @click="gobackStep2()">prev</el-button>
          </div>
        </div>
        <div class="sign_content">
          <h2>Step 3: Export Signatures</h2>
          <el-form :label-position="labelPosition" label-width="140px">
            <el-form-item label="Crypto Currency">
              <el-input v-model="data.currency" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Public Key" prop="publicKey">
              <el-input v-model="data.publicKey" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Address" prop="address">
              <el-input v-model="data.address" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item
              label="Address(Bech32)"
              prop="bech32Address"
              v-if="data.bech32Address!==''"
            >
              <el-input v-model="data.bech32Address" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item
              label="Address(BitcoinCash)"
              prop="bchAddress"
              v-if="data.bchAddress!==''"
            >
              <el-input v-model="data.bchAddress" :disabled="true"></el-input>
            </el-form-item>
            <hr />
            <el-form-item label="Message" prop="message">
              <el-input type="textarea" v-model="data.message" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Signature" prop="signature">
              <el-input type="textarea" v-model="data.signature" :disabled="true"></el-input>
            </el-form-item>
            <br />
            <el-form-item>
              <el-button
                type="primary"
                v-clipboard:copy="JSON.stringify(download_data[0])"
              >Copy as Json</el-button>
              <download-csv
                class="el-button el-button--primary"
                :data="download_data"
                name="signature.csv"
              >Download CSV</download-csv>
              <download-excel
                class="el-button el-button--primary"
                :data="download_data"
              >Download Excel</download-excel>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <el-dialog
          title="Modify Derivation Path"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <div style="text-align: center; font-size: 18px">
            <b>{{ this.data.derivationPath }}/{{this.data.derivation.index}}</b>
          </div>
          <el-form>
            <el-form-item label="purpose">
              <el-select
                v-model="data.derivation.purpose"
                placeholder="Please select a derivation path"
                @change="derivationChange()"
              >
                <el-option label="BIP32" value="0"></el-option>
                <el-option label="BIP44" value="44"></el-option>
                <el-option label="BIP49" value="49"></el-option>
                <el-option label="BIP84" value="84"></el-option>
                <el-option label="BIP141" value="141"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="Account"
              prop="account"
              v-if="this.data.derivation.purpose!=='141'"
            >
              <el-input
                v-model="data.derivation.account"
                type="number"
                @change="derivationChange()"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Change"
              prop="change"
              v-if="this.data.derivation.purpose!=='141'"
            >
              <el-input
                v-model="data.derivation.change"
                type="number"
                @change="derivationChange()"
              ></el-input>
            </el-form-item>
            <el-form-item label="Address Index" prop="index">
              <el-input
                v-model="data.derivation.index"
                type="number"
                @change="derivationChange()"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import bitcoinjs from 'bitcoinjs-lib'
import bitcoinMessage from 'bitcoinjs-message'
import bchaddr from 'bchaddrjs'
import isHex from 'is-hex'
import bip39 from 'bip39'
import bip32 from 'bip32'
import EthCrypto from 'eth-crypto'
import ripple from 'ripple-bip32'
import rippleSign from 'ripple-keypairs'

export default {
  name: 'home',
  data () {
    return {
      steps: 0,
      tabPosition: 'left',
      labelPosition: 'right',
      dialogVisible: false,
      data: {
        currency: 'BTC - Bitcoin',
        importType: 'privateKey',
        mnemonic: '',
        passphrase: '',
        derivation: {
          purpose: '0',
          cointype: 0,
          account: 0,
          change: 0,
          index: 0,
          count: 1
        },
        derivationPath: '',
        count: 1,
        rootkey: '',
        privkeies: [],
        privateKey: '',
        publicKey: '',
        address: '',
        bech32Address: '',
        bchAddress: '',
        rippleBase58: '',
        message: '',
        signature: ''
      },
      currencies: [
        {
          key: '1',
          value: 'BCH - Bitcoin Cash',
          name: 'BCH - Bitcoin Cash'
        },
        {
          key: '2',
          value: 'BTC - Bitcoin',
          name: 'BTC - Bitcoin'
        },
        {
          key: '3',
          value: 'BTC - Bitcoin Testnet',
          name: 'BTC - Bitcoin Testnet'
        },
        {
          key: '4',
          value: 'BTG - Bitcoin Gold',
          name: 'BTG - Bitcoin Gold'
        },
        {
          key: '5',
          value: 'ETC - Ethereum Classic',
          name: 'ETC - Ethereum Classic'
        },
        {
          key: '6',
          value: 'ETH - Ethereum',
          name: 'ETH - Ethereum'
        },
        {
          key: '7',
          value: 'LTC - Litecoin',
          name: 'LTC - Litecoin'
        },
        {
          key: '8',
          value: 'XRP - Ripple',
          name: 'XRP - Ripple'
        }
      ],
      download_data: {}
    }
  },
  errorCaptured (err, vm, info) {
    this.$message.warning(err.message)
  },
  methods: {
    gotoStep2 () {
      this.steps = 1
    },
    gobackStep1 () {
      this.steps = 0
    },
    gotoStep3 () {
      this.steps = 2
      if (this.data.bech32Address !== '') {
        this.download_data = [
          {
            currency: this.data.currency,
            publicKey: this.data.publicKey,
            address: this.data.address,
            bech32Address: this.data.bech32Address,
            message: this.data.message,
            signature: this.data.signature
          }
        ]
      } else if (this.data.bchAddress !== '') {
        this.download_data = [
          {
            currency: this.data.currency,
            publicKey: this.data.publicKey,
            address: this.data.address,
            bchAddress: this.data.bchAddress,
            message: this.data.message,
            signature: this.data.signature
          }
        ]
      } else {
        this.download_data = [
          {
            currency: this.data.currency,
            publicKey: this.data.publicKey,
            address: this.data.address,
            message: this.data.message,
            signature: this.data.signature
          }
        ]
      }
    },
    gobackStep2 () {
      this.steps = 1
      this.download_data = []
    },
    currencyChange () {
      this.clearMnemonic()
      this.clearPrivateKey()
      this.clearSignature()
    },
    importTypeChange () {
      if (this.data.importType === 'privateKey') {
        this.clearMnemonic()
        this.clearPrivateKey()
        this.clearSignature()
      } else if (this.data.importType === 'mnemonic') {
        this.clearPrivateKey()
        this.clearSignature()
      }
    },
    mnemonicChanged () {
      var mnemonic = this.data.mnemonic
      this.clearMnemonic()
      if (mnemonic === '') {
        return
      }
      this.data.mnemonic = mnemonic

      var currency = this.data.currency
      var passphrase = this.data.passphrase
      var seed = bip39.mnemonicToSeed(mnemonic, passphrase)
      var network = this.chooseNetWork(currency)
      if (currency === 'XRP - Ripple') {
        var root1 = ripple.fromSeedBuffer(seed)
        this.data.rootkey = root1.toBase58()
        this.derivationChange()
      } else {
        var root2 = bip32.fromSeed(seed, network)
        this.data.rootkey = root2.toBase58()
        this.derivationChange()
      }
    },
    derivationChange () {
      var purpose = this.data.derivation.purpose
      var account = this.data.derivation.account
      var change = this.data.derivation.change
      if (purpose === '141') {
        this.data.derivationPath = 'm/0'
        return
      }
      var currency = this.data.currency
      this.data.derivationPath = 'm/'
      if (purpose === '44' || purpose === '49' || purpose === '84') {
        this.data.derivationPath =
          this.data.derivationPath +
          purpose +
          "'/" +
          this.readCoinType(currency) +
          "'/"
      }
      this.data.derivationPath =
        this.data.derivationPath + account + "'/" + change
      this.generatePrivatekeies()
    },
    generatePrivatekeies () {
      var ethUtil = require('ethereumjs-util')

      this.data.privkeies = []
      this.clearPrivateKey()
      if (this.data.rootkey === '') {
        return
      }
      var currency = this.data.currency
      var network = this.chooseNetWork(currency)
      var root = bip32.fromBase58(this.data.rootkey, network)
      var count = this.data.derivation.count
      var index = this.data.derivation.index
      var path = this.data.derivationPath

      for (var i = 0; i < count; i++) {
        var indexValue = index + i

        if (
          currency === 'ETH - Ethereum' ||
          currency === 'ETC - Ethereum Classic'
        ) {
          var child1 = root.derivePath(path + '/' + indexValue)
          var valueHex = ethUtil.bufferToHex(child1.privateKey)
          var label1 = valueHex + '(' + path + '/' + indexValue + ')'
          this.data.privkeies.push({ key: valueHex, label: label1 })
        } else if (currency === 'XRP - Ripple') {
          root = ripple.fromBase58(this.data.rootkey)
          var child2 = root.derivePath(path + '/' + indexValue)
          var valueBase58 = child2.toBase58()
          var valueRipple = child2.keyPair.getKeyPairs().privateKey
          var label2 = valueRipple + '(' + path + '/' + indexValue + ')'
          this.data.privkeies.push({ key: valueBase58, label: label2 })
        } else {
          var child3 = root.derivePath(path + '/' + indexValue)
          var value = child3.toWIF()
          var label3 = value + '(' + path + '/' + indexValue + ')'
          this.data.privkeies.push({ key: child3.toWIF(), label: label3 })
        }
      }
    },
    privakeyChange () {
      var ethUtil = require('ethereumjs-util')
      var keyPair
      var privateKey = this.data.privateKey
      this.clearPrivateKey()
      if (privateKey === '') {
        return
      }
      this.data.privateKey = privateKey

      var currency = this.data.currency
      var network = this.chooseNetWork(currency)
      if (currency === 'BCH - Bitcoin Cash') {
        keyPair = bitcoinjs.ECPair.fromWIF(privateKey, network)
        this.data.publicKey = keyPair.publicKey.toString('hex')
        this.data.address = bitcoinjs.payments.p2pkh({
          pubkey: keyPair.publicKey
        }).address
        this.data.bchAddress = bchaddr.toCashAddress(this.data.address)
      } else if (
        currency === 'ETH - Ethereum' ||
        currency === 'ETC - Ethereum Classic'
      ) {
        privateKey = privateKey.startsWith('0x')
          ? privateKey.slice(2)
          : privateKey
        if (!isHex(privateKey)) {
          return
        }
        privateKey = Buffer.from(privateKey, 'hex')
        if (ethUtil.isValidPrivate(privateKey)) {
          this.data.publicKey = ethUtil.addHexPrefix(
            ethUtil.privateToPublic(privateKey).toString('hex')
          )
          var address = ethUtil.toChecksumAddress(
            ethUtil.privateToAddress(privateKey).toString('hex')
          )
          this.data.address = ethUtil.addHexPrefix(address)
        } else {
          console.log('invalid private key:', privateKey)
        }
      } else if (currency === 'XRP - Ripple') {
        var rippleHD = ripple.fromBase58(privateKey, network)
        this.data.rippleBase58 = privateKey
        this.data.privateKey = rippleHD.keyPair.getKeyPairs().privateKey
        this.data.publicKey = rippleHD.keyPair.getKeyPairs().publicKey
        this.data.address = rippleHD.getAddress()
      } else {
        keyPair = bitcoinjs.ECPair.fromWIF(privateKey, network)
        this.data.publicKey = keyPair.publicKey.toString('hex')
        this.data.address = bitcoinjs.payments.p2pkh({
          pubkey: keyPair.publicKey
        }).address
        if ('bech32' in network) {
          this.data.bech32Address = bitcoinjs.payments.p2wpkh({
            pubkey: keyPair.publicKey
          }).address
        }
      }
    },
    messageChange () {
      var keyPair
      var privateKey = this.data.privateKey
      var message = this.data.message
      var currency = this.data.currency
      var network = this.chooseNetWork(currency)

      if (message === '') {
        this.clearSignature()
        return
      }

      if (
        currency === 'ETH - Ethereum' ||
        currency === 'ETC - Ethereum Classic'
      ) {
        var messageHash = EthCrypto.hash.keccak256(message)
        var signature = EthCrypto.sign(privateKey, messageHash)
        this.data.signature = signature
      } else if (currency === 'XRP - Ripple') {
        var messageHex = Buffer.from(message, 'utf8').toString('hex')
        this.data.signature = rippleSign.sign(messageHex, privateKey)
      } else {
        keyPair = bitcoinjs.ECPair.fromWIF(privateKey, network)
        this.data.signature = bitcoinMessage
          .sign(message, keyPair.privateKey)
          .toString('base64')
      }
    },
    clearMnemonic () {
      this.data.mnemonic = ''
      this.data.passphrase = ''
      this.data.derivation = {
        purpose: '32',
        cointype: 0,
        account: 0,
        change: 0,
        index: 0,
        count: 1
      }
      this.data.rootkey = ''
      this.data.privkeies = []
    },
    clearPrivateKey () {
      this.data.privateKey = ''
      this.data.publicKey = ''
      this.data.address = ''
      this.data.bech32Address = ''
      this.data.bchAddress = ''
      this.data.rippleBase58 = ''
    },
    clearSignature () {
      this.data.message = ''
      this.data.signature = ''
    },
    chooseNetWork (currency) {
      var network = {}
      if (currency === 'BCH - Bitcoin Cash') {
        network = bitcoinjs.networks.bitcoin
      } else if (currency === 'BTC - Bitcoin') {
        network = bitcoinjs.networks.bitcoin
      } else if (currency === 'BTC - Bitcoin Testnet') {
        network = bitcoinjs.networks.testnet
      } else if (currency === 'BTG - Bitcoin Gold') {
        network = {
          messagePrefix: '\x1DBitcoin Gold Signed Message:\n',
          bip32: {
            public: 0x0488b21e,
            private: 0x0488ade4
          },
          pubKeyHash: 38,
          scriptHash: 23,
          wif: 128
        }
      } else if (currency === 'ETC - Ethereum Classic') {
        network = bitcoinjs.networks.bitcoin
      } else if (currency === 'ETH - Ethereum') {
        network = bitcoinjs.networks.bitcoin
      } else if (currency === 'LTC - Litecoin') {
        network = {
          messagePrefix: '\x19Litecoin Signed Message:\n',
          bip32: {
            public: 0x019da462,
            private: 0x019d9cfe
          },
          pubKeyHash: 0x30,
          scriptHash: 0x32,
          wif: 0xb0
        }
        // DOM.litecoinLtubContainer.removeClass('hidden')
      } else if (currency === 'XRP - Ripple') {
        network = bitcoinjs.networks.bitcoin
      }
      return network
    },
    readCoinType (currency) {
      if (currency === 'BCH - Bitcoin Cash') {
        return 145
      } else if (currency === 'BTC - Bitcoin') {
        return 0
      } else if (currency === 'BTC - Bitcoin Testnet') {
        return 1
      } else if (currency === 'BTG - Bitcoin Gold') {
        return 156
      } else if (currency === 'ETC - Ethereum Classic') {
        return 61
      } else if (currency === 'ETH - Ethereum') {
        return 60
      } else if (currency === 'LTC - Litecoin') {
        return 2
      } else if (currency === 'XRP - Ripple') {
        return 144
      } else if (currency === 'XZC - Zcoin') {
        return 136
      } else if (currency === 'ZEC - Zcash') {
        return 133
      }
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>
<style>
.quill_content {
  width: 80%;
  margin: auto;
  border: 1px;
  border-color: black;
  padding-top: 40px;
  padding-bottom: 40px;
}

.online_warning {
  padding-top: 50px;
  color: red;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.operation_content {
  padding: 20px;
  width: 70%;
  margin: auto;
  margin-top: 20px;
  border: 1px;
  border-color: black;
  border-style: solid;
}

.sign_content {
  /* padding-top: 10px; */
  width: 95%;
  margin: auto;
}

.left_arrow {
  width: 97%;
  text-align: left;
}

.right_arrow {
  width: 97%;
  text-align: right;
}

.el-form .el-select {
  width: 100%;
}

.el-input__inner {
  border-color: #000;
}

.el-textarea__inner {
  border-color: #000;
}

.el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  color: #606266;
  border-color: #eee;
}
.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  color: #606266;
  border-color: #eee;
}

.el-form-item__label {
  font-weight: bold;
}

h2 {
  text-align: center;
}
</style>
