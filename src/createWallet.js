//importando as depedencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//testenet - rede de teste (a rede principal seria - bitcoin - mainnet)
const network = bitcoin.networks.testnet

//derivacao de carteiras HD
const path = `m/49'/1'/0'/0`

//criando as palavras mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)


//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par (KeyPrivate and PublicKey)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address


console.log('Carteira gerada')
console.log('Endereço: ', btcAddress)
console.log('Chave Privada: ', node.toWIF())
console.log('Seed Phrase: ', mnemonic)
