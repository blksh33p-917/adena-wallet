import { GnoClient } from '.';

const ACCOUNT_ADDRESS = 'g1ffzxha57dh0qgv9ma5v393ur0zexfvp6lsjpae';
const ACCOUNT_ADDRESS_INVALID = 'aaa';

let gnoClient: GnoClient;

beforeEach(() => {
  gnoClient = GnoClient.createNetworkByType({

    chainId: 'test2',
    chainName: 'Testnet 2',
    rpcUrl: 'https://rpc.test2.gno.land',
    apiUrl: 'https://api.adena.app',
    linkUrl: 'https://gnoscan.io',
  },
    'TEST2',
  );
});

describe('contructor', () => {
  test('environment variable is test2', async () => {
    const host = process.env.NETWORK_TEST2_HOST;

    expect(host).not.toBeUndefined();
  });

  test('initilaize success', async () => {
    expect(gnoClient).not.toBeNull();
  });

  test('mapper version is TEST2', async () => {
    expect(gnoClient.mapperVersion).toBe('TEST2');
  });
});

describe('health check', () => {
  test('success', async () => {
    const isHealth = await gnoClient.isHealth();
    expect(isHealth).toBe(true);
  });
});

describe('get account info', () => {
  /**
   * 0: description
   * 1: address
   * 2: expected_status
   */
  test.each([
    ['normal user, status: ACTIVE', ACCOUNT_ADDRESS, 'ACTIVE'],
    ['empty user, status: NONE', ACCOUNT_ADDRESS_INVALID, 'NONE'],
  ])('%s', async (_, address, expectedStatus) => {
    const account = await gnoClient.getAccount(address);

    expect(account).toBeInstanceOf(Object);
    expect(account).toHaveProperty('address');
    expect(account).toHaveProperty('coins');
    expect(account).toHaveProperty('publicKey');
    expect(account).toHaveProperty('accountNumber');
    expect(account).toHaveProperty('sequence');

    expect(account.status).toBe(expectedStatus);
  });
});

describe('get balances', () => {
  /**
   * 0: description
   * 1: address
   * 2: expected_has_data
   */
  test.each([
    ['normar user, balacnes length is 1', ACCOUNT_ADDRESS, 1],
    ['empty user, balacnes length is 1', ACCOUNT_ADDRESS_INVALID, 1],
  ])('%s', async (_, address: string, expectedHasData) => {
    const balances = await gnoClient.getBalances(address);

    expect(balances).toHaveProperty('balances');
    expect(balances.balances).toHaveLength(1);
    expect(balances.balances[0]).toHaveProperty('amount');
    expect(balances.balances[0]).toHaveProperty('unit');
  });
});

describe('abci query render', () => {
  /**
   * 0: package path
   * 1: data
   */
  test.each([
    ['gno.land/r/users', ''],
    ['gno.land/r/boards', ''],
  ])('package: %s', async (packagePath: string, data: string) => {
    const response = await gnoClient.queryRender(packagePath);

    expect(response).toHaveProperty('ResponseBase');
    expect(response?.ResponseBase.Data).not.toBe(null);
  });
});
